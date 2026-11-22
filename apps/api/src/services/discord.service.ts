import prismaModule from "../prisma.js";

const DISCORD_API_BASE = "https://discord.com/api/v10";
const DISCORD_FETCH_TIMEOUT_MS = 10_000;

const discordFetch = async (
  url: string,
  init?: RequestInit
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    DISCORD_FETCH_TIMEOUT_MS
  );
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

type DiscordTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
};

type DiscordUserResponse = {
  id: string;
  username: string;
};

const getRequiredEnv = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
};

const buildOAuthRedirectUri = (): string => {
  const apiBaseUrl = process.env.API_BASE_URL;
  if (apiBaseUrl) {
    return `${apiBaseUrl.replace(/\/$/, "")}/auth/discord/callback`;
  }
  const fallback = process.env.CORS_ORIGINS?.split(",")[0]?.trim();
  if (!fallback) {
    throw new Error("API_BASE_URL or CORS_ORIGINS must be configured");
  }
  return `${fallback.replace(":3000", ":4000").replace(/\/$/, "")}/auth/discord/callback`;
};

export const discordService = {
  isAutomationEnabled(): boolean {
    return process.env.FEATURE_DISCORD_AUTOMATION === "true";
  },

  buildAuthorizationUrl(state: string): string {
    const clientId = getRequiredEnv("DISCORD_CLIENT_ID");
    const redirectUri = buildOAuthRedirectUri();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "identify guilds.join",
      state,
      prompt: "consent",
    });
    return `https://discord.com/oauth2/authorize?${params.toString()}`;
  },

  async exchangeCodeForToken(code: string): Promise<DiscordTokenResponse> {
    const clientId = getRequiredEnv("DISCORD_CLIENT_ID");
    const clientSecret = getRequiredEnv("DISCORD_CLIENT_SECRET");
    const redirectUri = buildOAuthRedirectUri();

    const payload = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      scope: "identify guilds.join",
    });

    const response = await discordFetch(`${DISCORD_API_BASE}/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Discord token exchange failed: ${response.status} ${body}`);
    }

    return (await response.json()) as DiscordTokenResponse;
  },

  async fetchCurrentDiscordUser(accessToken: string): Promise<DiscordUserResponse> {
    const response = await discordFetch(`${DISCORD_API_BASE}/users/@me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Discord user fetch failed: ${response.status} ${body}`);
    }

    return (await response.json()) as DiscordUserResponse;
  },

  async upsertDiscordAccount(params: {
    userId: string;
    discordUserId: string;
    accessToken: string;
    refreshToken?: string;
    expiresIn: number;
    tokenType: string;
    scope?: string;
  }) {
    const { prisma } = prismaModule;
    const expiresAt = Math.floor(Date.now() / 1000) + params.expiresIn;
    const updateData: any = {
      userId: params.userId,
      access_token: params.accessToken,
      expires_at: expiresAt,
      token_type: params.tokenType,
    };

    const createData: any = {
      userId: params.userId,
      type: "oauth",
      provider: "discord",
      providerAccountId: params.discordUserId,
      access_token: params.accessToken,
      expires_at: expiresAt,
      token_type: params.tokenType,
    };

    if (params.refreshToken !== undefined) {
      updateData.refresh_token = params.refreshToken;
      createData.refresh_token = params.refreshToken;
    }

    if (params.scope !== undefined) {
      updateData.scope = params.scope;
      createData.scope = params.scope;
    }

    const existingUserWithDiscord = await prisma.user.findFirst({
      where: {
        discordUserId: params.discordUserId,
        id: { not: params.userId },
      },
    });
    if (existingUserWithDiscord) {
      throw new Error("Discord account is already linked to another user");
    }

    const existingAccount = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: params.discordUserId,
        },
      },
    });
    if (existingAccount && existingAccount.userId !== params.userId) {
      throw new Error("Discord account is already linked to another user");
    }

    await prisma.$transaction(async (tx) => {
      await tx.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: "discord",
            providerAccountId: params.discordUserId,
          },
        },
        update: updateData,
        create: createData,
      });

      await tx.user.update({
        where: { id: params.userId },
        data: { discordUserId: params.discordUserId } as any,
      });
    });
  },

  async getDiscordAccountForUser(userId: string) {
    const { prisma } = prismaModule;
    return prisma.account.findFirst({
      where: {
        userId,
        provider: "discord",
      },
    });
  },

  async getDiscordCredentialsForGuildJoin(userId: string) {
    const account = await discordService.getDiscordAccountForUser(userId);
    if (!account?.providerAccountId) return null;

    let accessToken = account.access_token;
    if (
      account.expires_at !== null &&
      account.expires_at <= Math.floor(Date.now() / 1000)
    ) {
      if (!account.refresh_token) {
        throw new Error("Expired Discord credentials have no refresh token");
      }

      const response = await discordFetch(`${DISCORD_API_BASE}/oauth2/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: getRequiredEnv("DISCORD_CLIENT_ID"),
          client_secret: getRequiredEnv("DISCORD_CLIENT_SECRET"),
          grant_type: "refresh_token",
          refresh_token: account.refresh_token,
        }).toString(),
      });
      if (!response.ok) {
        throw new Error(`Discord token refresh failed: ${response.status}`);
      }

      const token = (await response.json()) as DiscordTokenResponse;
      if (
        !token.access_token ||
        !Number.isInteger(token.expires_in) ||
        token.expires_in <= 0
      ) {
        throw new Error("Discord token refresh returned unusable credentials");
      }

      await prismaModule.prisma.account.update({
        where: { id: account.id },
        data: {
          access_token: token.access_token,
          expires_at: Math.floor(Date.now() / 1000) + token.expires_in,
          token_type: token.token_type,
          ...(token.refresh_token !== undefined && {
            refresh_token: token.refresh_token,
          }),
          ...(token.scope !== undefined && { scope: token.scope }),
        },
      });
      accessToken = token.access_token;
    }

    return accessToken
      ? { discordUserId: account.providerAccountId, accessToken }
      : null;
  },

  async addMemberToProGuild(discordUserId: string, userAccessToken: string) {
    const botToken = getRequiredEnv("DISCORD_BOT_TOKEN");
    const guildId = getRequiredEnv("DISCORD_PRO_GUILD_ID");

    const response = await discordFetch(
      `${DISCORD_API_BASE}/guilds/${guildId}/members/${discordUserId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: userAccessToken,
        }),
      }
    );

    if (!response.ok && response.status !== 201 && response.status !== 204) {
      const body = await response.text();
      throw new Error(`Discord add member failed: ${response.status} ${body}`);
    }
  },

  async isMemberOfProGuild(discordUserId: string): Promise<boolean> {
    const botToken = getRequiredEnv("DISCORD_BOT_TOKEN");
    const guildId = getRequiredEnv("DISCORD_PRO_GUILD_ID");
    const response = await discordFetch(
      `${DISCORD_API_BASE}/guilds/${guildId}/members/${discordUserId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      }
    );

    if (response.status === 200) {
      return true;
    }

    if (response.status === 404) {
      return false;
    }

    const body = await response.text();
    throw new Error(`Discord member check failed: ${response.status} ${body}`);
  },

  async removeMemberFromProGuild(discordUserId: string) {
    const botToken = getRequiredEnv("DISCORD_BOT_TOKEN");
    const guildId = getRequiredEnv("DISCORD_PRO_GUILD_ID");
    const response = await discordFetch(
      `${DISCORD_API_BASE}/guilds/${guildId}/members/${discordUserId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      }
    );

    if (!response.ok && response.status !== 204 && response.status !== 404) {
      const body = await response.text();
      throw new Error(`Discord remove member failed: ${response.status} ${body}`);
    }
  },
};

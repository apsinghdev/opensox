type MembershipLockClient = {
  $queryRaw: (
    query: TemplateStringsArray,
    ...values: unknown[]
  ) => Promise<unknown>;
};

/**
 * Same lock fulfillment takes while it extends a membership.
 * Hold it from the live-membership read through Discord removal so a renewal
 * cannot commit in between.
 */
export async function lockUserMembership(
  tx: MembershipLockClient,
  userId: string,
) {
  await tx.$queryRaw`
    SELECT 1 AS locked
    FROM (SELECT pg_advisory_xact_lock(hashtextextended(${userId}, 0))) AS acquired
  `;
}

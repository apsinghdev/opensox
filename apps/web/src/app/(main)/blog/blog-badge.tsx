import Link from "next/link";

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-3.5 shrink-0"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function BlogBadge({
  tweetUrl,
  tag,
}: {
  tweetUrl?: string;
  tag: string;
}) {
  if (tweetUrl) {
    return (
      <Link
        href={tweetUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Discussed on Twitter, ${tag} (opens in a new tab)`}
        className="blog-discuss-badge"
      >
        <XIcon />
        <span>Discussed on Twitter</span>
        <span aria-hidden="true">&middot;</span>
        <span className="capitalize">{tag}</span>
        <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  }

  return (
    <span className="blog-discuss-badge">
      <span className="capitalize">{tag}</span>
    </span>
  );
}

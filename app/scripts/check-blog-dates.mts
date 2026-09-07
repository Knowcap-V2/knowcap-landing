// Blog-date guard.
//
// Fails if any published post's `date` is not a plain ISO day (YYYY-MM-DD), or if
// the post list getAllPosts() returns is not in true newest-first order.
//
// The failure it exists to catch: an UNQUOTED frontmatter date (`date: 2026-06-28`)
// is parsed by YAML into a Date object, and stringifying that gives a raw machine
// timestamp — "Sun Jun 28 2026 03:00:00 GMT+0300 (...)" — which was rendered to
// visitors on 7 of 22 posts, fed into the JSON-LD and OpenGraph date tags, and
// sorted as TEXT so every broken post outranked every correct one (Odoo #8363).
//
// The ordering assertion is the load-bearing half. `date` doubles as the sort key
// (getAllPosts sorts on it directly), so prettifying it for display — the obvious
// "fix" — makes "July 6, 2026" sort behind "June 29, 2026" and breaks the order for
// all 22 posts instead of 7. Comparing the returned order against real parsed time,
// rather than against the key it was sorted by, is what makes that regression fail
// here instead of on the live site.
//
// Run from app/:  npx tsx scripts/check-blog-dates.mts

const blog: any = await import('../lib/blog')
const getAllPosts = blog.getAllPosts ?? blog.default?.getAllPosts

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/
const posts: { slug: string; date: string }[] = getAllPosts()

if (posts.length === 0) {
  console.error('[blog-dates] no posts found — run this from the app/ directory.')
  process.exit(1)
}

// Shape AND calendar: "2026-02-30" passes the regex, and Date silently slides it to
// 2026-03-02 — which would then sort two days off its own label. Round-tripping the
// parse back to the same ISO day rejects a date that does not exist.
// The isNaN guard is not decoration: "2026-13-01" yields an Invalid Date, and calling
// toISOString() on that THROWS — which would crash this check instead of failing it.
const isIsoDay = (d: string) => {
  if (!ISO_DAY.test(d)) return false
  const parsed = new Date(d + 'T00:00:00Z')
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === d
}

const malformed = posts.filter((p) => !isIsoDay(p.date))

// Non-increasing in ACTUAL time, not in the string the sort happened to use.
const outOfOrder = posts.filter(
  (p, i) => i > 0 && new Date(posts[i - 1].date).getTime() < new Date(p.date).getTime()
)

if (malformed.length || outOfOrder.length) {
  if (malformed.length) {
    console.error(`\n[blog-dates] ${malformed.length} of ${posts.length} posts have a non-ISO date:`)
    for (const p of malformed) console.error(`  ${p.slug} -> ${JSON.stringify(p.date)}`)
    console.error('\nQuote the date in the post frontmatter, or fix normalisation in lib/blog.ts.')
  }
  if (outOfOrder.length) {
    console.error('\n[blog-dates] posts are not newest-first. Order returned:')
    for (const p of posts) console.error(`  ${p.date}  ${p.slug}`)
    console.error('\n`date` is the sort key — it must stay a plain ISO day, never a prettified label.')
  }
  process.exit(1)
}

console.log(`[blog-dates] ✓ ${posts.length} posts, all ISO dates, newest-first.`)
process.exit(0)

# agent.py (Vercel-compatible: No subprocess, static Twitter mock)

try:
    import feedparser
except ModuleNotFoundError:
    print("\n[ERROR] Missing dependency 'feedparser'. Please install it with:")
    print("pip install feedparser\n")
    feedparser = None

import datetime

# === CONFIGURATION ===
RSS_FEEDS = [
    "https://aws.amazon.com/blogs/aws/feed/",
    "https://developer.atlassian.com/blog/rss.xml",
    "https://blogs.salesforce.com/feed"
]

# === STEP 1: Fetch from RSS Feeds ===
def fetch_marketplace_updates():
    if feedparser is None:
        return [{
            "title": "Feedparser not installed",
            "summary": "Install the 'feedparser' module to enable RSS parsing.",
            "link": "https://pypi.org/project/feedparser/",
            "source": "Local"
        }]

    articles = []
    for url in RSS_FEEDS:
        parsed = feedparser.parse(url)
        for entry in parsed.entries[:3]:  # Reduce volume for serverless
            articles.append({
                "title": entry.title,
                "summary": entry.summary,
                "link": entry.link,
                "source": url
            })
    return articles

# === STEP 2: Static Twitter Chatter Mock ===
def fetch_tweets():
    return [
        {
            "text": "Big changes coming to SaaS marketplaces. Atlassian launches new billing APIs!",
            "author": "SaaSObserver",
            "link": "https://twitter.com/SaaSObserver/status/1234567890"
        },
        {
            "text": "AWS Marketplace now supports usage-based pricing for new vendors.",
            "author": "CloudBizNews",
            "link": "https://twitter.com/CloudBizNews/status/0987654321"
        }
    ]

# === STEP 3: Format Digest ===
def generate_feed():
    today = datetime.date.today().strftime("%B %d, %Y")
    articles = fetch_marketplace_updates()
    tweets = fetch_tweets()

    lines = [f"**Daily SaaS Marketplaces Digest – {today}**"]

    lines.append("\n🔧 *Marketplace Feature Launches:*")
    for art in articles:
        lines.append(f"• {art['title']}\n{art['summary'][:200]}...\n[Read more]({art['link']})\n")

    lines.append("\n💬 *Social Chatter (Mock):*")
    for tw in tweets:
        lines.append(f"• @{tw['author']}: {tw['text'][:200]}...\n[View Tweet]({tw['link']})\n")

    return "\n".join(lines)


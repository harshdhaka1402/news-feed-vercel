# agent.py (Full version with Twitter API, query encoding, debug prints, fallback, and dotenv)

import os
import datetime
import requests
from urllib.parse import quote

try:
    import feedparser
except ModuleNotFoundError:
    print("\n[ERROR] Missing dependency 'feedparser'. Please install it with:")
    print("pip install feedparser\n")
    feedparser = None

# Load environment variables from .env file (if it exists)
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("[INFO] 'python-dotenv' not found. Skipping .env loading.")

# === CONFIGURATION ===
RSS_FEEDS = [
    "https://aws.amazon.com/blogs/aws/feed/",
    "https://developer.atlassian.com/blog/rss.xml",
    "https://blogs.salesforce.com/feed"
]
TWITTER_BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")

# === STEP 1: Fetch from RSS Feeds ===
def fetch_marketplace_updates():
    if feedparser is None:
        return [{
            "title": "Feedparser not installed",
            "summary": "Install the 'feedparser' module to enable RSS parsing.",
            "link": "https://pypi.org/project/feedparser/",
            "source": "Local",
            "tags": ["setup"]
        }]

    articles = []
    for url in RSS_FEEDS:
        parsed = feedparser.parse(url)
        for entry in parsed.entries[:3]:
            tags = []
            if "aws.amazon.com" in url:
                tags.append("aws")
            if "atlassian" in url:
                tags.append("atlassian")
            if "salesforce" in url:
                tags.append("salesforce")

            articles.append({
                "title": entry.title,
                "summary": entry.summary[:300],
                "link": entry.link,
                "source": url,
                "tags": tags
            })
    return articles

# === STEP 2: Fetch Tweets via Twitter API with Debug and Encoding ===
def fetch_tweets(query="SaaS Marketplace", count=15):
    print("Bearer loaded:", TWITTER_BEARER_TOKEN[:10] if TWITTER_BEARER_TOKEN else "None")

    if not TWITTER_BEARER_TOKEN:
        print("[WARN] Twitter Bearer Token not found in environment. Returning empty tweets.")
        return []

    headers = {
        "Authorization": f"Bearer {TWITTER_BEARER_TOKEN}"
    }
    encoded_query = quote(query)
    url = f"https://api.twitter.com/2/tweets/search/recent?query={encoded_query}&max_results={count}&tweet.fields=author_id,text"
    print("Final URL:", url)

    try:
        response = requests.get(url, headers=headers)
        print("Twitter status:", response.status_code)
        print("Twitter response:", response.text[:500])
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("[ERROR] Twitter API request failed:", e)
        return []

    data = response.json()
    tweets = []
    for tweet in data.get("data", []):
        tweets.append({
            "summary": tweet["text"][:300],
            "author": tweet["author_id"],
            "link": f"https://twitter.com/i/web/status/{tweet['id']}",
            "tags": ["twitter", "social", "saas"]
        })

    if not tweets:
        print("No tweets found, using fallback")
        tweets = [{
            "summary": "No real tweets available",
            "author": "fallback",
            "link": "https://twitter.com/",
            "tags": ["debug"]
        }]

    return tweets

# === STEP 3: Generate Structured Feed ===
def generate_feed():
    today = datetime.date.today().strftime("%B %d, %Y")
    articles = fetch_marketplace_updates()
    tweets = fetch_tweets()

    feed = {
        "date": today,
        "feed": {
            "marketplace_updates": [
                {
                    "title": article["title"],
                    "summary": article["summary"],
                    "link": article["link"],
                    "source": article["source"],
                    "tags": article["tags"]
                } for article in articles
            ],
            "social_chatter": [
                {
                    "summary": tweet["summary"],
                    "author": tweet["author"],
                    "link": tweet["link"],
                    "tags": tweet["tags"]
                } for tweet in tweets
            ]
        }
    }

    return feed

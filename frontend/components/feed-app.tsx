"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, ShoppingCart, Star, MapPin } from "lucide-react"

// Mock data for marketplace feeds
const marketplaceFeeds = [
  {
    id: 1,
    seller: "TechStore Pro",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    product: 'MacBook Pro 14" M3 Chip',
    price: "$1,899",
    originalPrice: "$2,199",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    reviews: 124,
    location: "San Francisco, CA",
    timePosted: "2 hours ago",
    description: "Like new condition, barely used. Comes with original box and charger.",
    category: "Electronics",
  },
  {
    id: 2,
    seller: "Vintage Finds",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    product: "Mid-Century Modern Chair",
    price: "$450",
    originalPrice: "$650",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    reviews: 89,
    location: "Brooklyn, NY",
    timePosted: "4 hours ago",
    description: "Authentic 1960s design, recently reupholstered in premium fabric.",
    category: "Furniture",
  },
  {
    id: 3,
    seller: "GreenThumb Gardens",
    sellerAvatar: "/placeholder.svg?height=40&width=40",
    product: "Monstera Deliciosa Plant",
    price: "$35",
    originalPrice: "$50",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviews: 67,
    location: "Portland, OR",
    timePosted: "6 hours ago",
    description: "Healthy, mature plant with beautiful fenestrations. Perfect for any home.",
    category: "Plants",
  },
]

// Mock data for social chatter feeds
const socialFeeds = [
  {
    id: 1,
    user: "Alex Chen",
    username: "@alexchen",
    avatar: "/placeholder.svg?height=40&width=40",
    timePosted: "1 hour ago",
    content:
      "Just finished an amazing hike at Yosemite! The views were absolutely breathtaking. Nature really has a way of putting things into perspective. 🏔️✨",
    image: "/placeholder.svg?height=300&width=400",
    likes: 42,
    comments: 8,
    shares: 3,
  },
  {
    id: 2,
    user: "Sarah Johnson",
    username: "@sarahj",
    avatar: "/placeholder.svg?height=40&width=40",
    timePosted: "3 hours ago",
    content:
      "Coffee shop recommendation: The new place on 5th Street has the most incredible lavender latte! Perfect spot for remote work too. ☕️💜",
    likes: 28,
    comments: 12,
    shares: 5,
  },
  {
    id: 3,
    user: "Mike Rodriguez",
    username: "@mikerod",
    avatar: "/placeholder.svg?height=40&width=40",
    timePosted: "5 hours ago",
    content:
      'Finally finished reading "The Seven Husbands of Evelyn Hugo" and I\'m emotionally destroyed in the best way possible. Anyone else read this masterpiece? 📚💔',
    likes: 67,
    comments: 23,
    shares: 8,
  },
  {
    id: 4,
    user: "Emma Wilson",
    username: "@emmaw",
    avatar: "/placeholder.svg?height=40&width=40",
    timePosted: "8 hours ago",
    content:
      "Homemade pasta night was a success! Nothing beats fresh linguine with homemade pesto. The kids even helped roll out the dough. 🍝👨‍👩‍👧‍👦",
    image: "/placeholder.svg?height=300&width=400",
    likes: 89,
    comments: 15,
    shares: 12,
  },
]

export default function FeedApp() {
  const [activeTab, setActiveTab] = useState("marketplace")

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Feed Hub</h1>
        <p className="text-gray-600">Discover marketplace deals and social conversations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="marketplace" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Social Chatter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-4">
          {marketplaceFeeds.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.product}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={item.sellerAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{item.seller[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{item.seller}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="h-3 w-3" />
                            {item.location}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.product}</h3>
                    <p className="text-gray-600 mb-3">{item.description}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-gray-500">({item.reviews} reviews)</span>
                      </div>
                      <span className="text-sm text-gray-500">{item.timePosted}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">{item.price}</span>
                        <span className="text-lg text-gray-400 line-through">{item.originalPrice}</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        View Item
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          {socialFeeds.map((post) => (
            <Card key={post.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{post.user}</p>
                      <p className="text-gray-500">{post.username}</p>
                    </div>
                    <p className="text-sm text-gray-500">{post.timePosted}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full rounded-lg max-h-80 object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                      <Heart className="h-5 w-5" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="h-5 w-5" />
                      <span className="text-sm">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

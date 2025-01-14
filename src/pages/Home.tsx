import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  image: string;
  caption: string;
  timestamp: string;
  likes: number;
}

const MOCK_POSTS: Post[] = [
  {
    id: "1",
    user: {
      name: "johndoe",
      avatar: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    caption: "Working on something exciting! 🚀",
    timestamp: "2h ago",
    likes: 42,
  },
  {
    id: "2",
    user: {
      name: "janedoe",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    caption: "Perfect day for coding ☕️",
    timestamp: "4h ago",
    likes: 28,
  },
];

const Home = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow animate-fade-in"
        >
          <div className="p-4 flex items-center gap-3">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium">{post.user.name}</span>
          </div>
          <img
            src={post.image}
            alt=""
            className="w-full aspect-square object-cover"
          />
          <div className="p-4 space-y-3">
            <div className="flex gap-4">
              <button className="text-gray-700 hover:text-red-500 transition-colors">
                <Heart size={24} />
              </button>
              <button className="text-gray-700 hover:text-primary transition-colors">
                <Share2 size={24} />
              </button>
            </div>
            <div className="text-sm font-medium">{post.likes} likes</div>
            <div>
              <span className="font-medium">{post.user.name}</span>{" "}
              <span className="text-gray-900">{post.caption}</span>
            </div>
            <div className="text-gray-500 text-sm">{post.timestamp}</div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Home;
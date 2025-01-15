import { Heart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  user: {
    username: string;
    avatar_url: string | null;
  };
  image_url: string;
  caption: string | null;
  created_at: string;
  likes: number;
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    subscribeToNewPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          id,
          image_url,
          caption,
          created_at,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts = data.map((post: any) => ({
        id: post.id,
        user: {
          username: post.profiles?.username || 'Anonymous',
          avatar_url: post.profiles?.avatar_url,
        },
        image_url: post.image_url,
        caption: post.caption,
        created_at: new Date(post.created_at).toLocaleString(),
        likes: 0, // Placeholder for likes functionality
      }));

      setPosts(formattedPosts);
    } catch (error: any) {
      console.error('Error fetching posts:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToNewPosts = () => {
    const channel = supabase
      .channel('public:posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          fetchPosts(); // Refresh posts when a new one is added
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-6 space-y-6">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow animate-fade-in"
        >
          <div className="p-4 flex items-center gap-3">
            {post.user.avatar_url ? (
              <img
                src={post.user.avatar_url}
                alt={post.user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {post.user.username[0].toUpperCase()}
              </div>
            )}
            <span className="font-medium">{post.user.username}</span>
          </div>
          <img
            src={post.image_url}
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
            {post.caption && (
              <div>
                <span className="font-medium">{post.user.username}</span>{" "}
                <span className="text-gray-900">{post.caption}</span>
              </div>
            )}
            <div className="text-gray-500 text-sm">{post.created_at}</div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Home;
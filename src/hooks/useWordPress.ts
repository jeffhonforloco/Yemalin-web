
import { useState, useEffect } from 'react';
import { fetchWpPosts, fetchWpPostBySlug, fetchWpCategories, fetchWpProducts } from '../utils/wordpressIntegration';

export const useWordPressPosts = (page = 1, perPage = 10, category?: number) => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({ totalPosts: 0, totalPages: 0, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const result = await fetchWpPosts(page, perPage, category);
        setPosts(result.posts);
        setPagination(result.pagination);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching WordPress posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, perPage, category]);

  return { posts, pagination, loading, error };
};

export const useWordPressPost = (slug: string | undefined) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      try {
        const result = await fetchWpPostBySlug(slug);
        setPost(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching WordPress post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};

export const useWordPressCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const result = await fetchWpCategories();
        setCategories(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching WordPress categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useWordPressProducts = (page = 1, perPage = 10, category?: number) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ totalProducts: 0, totalPages: 0, currentPage: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await fetchWpProducts(page, perPage, category);
        setProducts(result.products);
        setPagination(result.pagination);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching WordPress products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, perPage, category]);

  return { products, pagination, loading, error };
};

export default {
  useWordPressPosts,
  useWordPressPost,
  useWordPressCategories,
  useWordPressProducts
};

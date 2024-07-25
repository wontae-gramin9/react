import { useState, createContext, useContext, useMemo } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

const PostContext = createContext();

function PostProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // PostProvider 부모가 re-render되면
  // 자식인 PostProvider도 re-render, 다시 말하면 value도 re-render(object니까)
  // 따라서 context consumer들은 context가 변했기 때문에 re-render한 것으로 나온다.

  // context에 의한 리렌더링을 막기위해 value object를 useMemo
  // 여전히 부모가 re-render되어 re-render되기는 함

  // 한 Provider에 모든 value를 몰빵하는것은 관련 없는 모든 consumer를 리렌더하기때문에 좋지 않다
  const value = useMemo(
    () => ({
      posts: searchedPosts,
      onAddPosts: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    }),
    [searchedPosts, searchQuery]
  );
  return (
    <PostContext.Provider value={value}>
      {/* children으로 자식들을 받는 순간부터 자식들은 최적화된다
      (Provider가 리렌더되기 전에 이미 렌더가 된 컴포넌트들이므로) */}
      {children}
    </PostContext.Provider>
  );
}

const usePost = () => {
  const context = useContext(PostContext);
  // 이 hook은 PostContext를 param으로 받기에
  // PostProvider 내부에서만 value를 가져올 수 있고,
  // 밖에서 사용하면 value는 undefined값을 가진다.
  // 이후에 버그를 찾기 어려울 수도 있기 때문에
  if (context === undefined)
    throw new Error("PostContext was used outside the PostProvider");
  return context;
};

export { PostProvider, usePost };

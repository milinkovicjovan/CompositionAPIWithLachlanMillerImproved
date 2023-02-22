import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { today, thisWeek, thisMonth } from "../posts";

function delay() {
  return new Promise((res) => setTimeout(res, 1500));
}

const usePosts = defineStore("posts", {
  state: () => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  actions: {
    setSelectedPeriod(period) {
      this.selectedPeriod = period;
    },

    async fetchPosts() {
      const res = await window.fetch("/api/posts");
      const data = await res.json();
      await delay();

      let ids = [];
      let all = new Map();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },

    createPost(post) {
      const body = JSON.stringify(post);
      return window.fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },

    updatePost(post) {
      const body = JSON.stringify(post);
      return window.fetch("/api/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
  },

  getters: {
    filteredPosts: (state) => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found.`);
          }

          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }

          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          return post;
        });
    },
  },
});

export { usePosts };

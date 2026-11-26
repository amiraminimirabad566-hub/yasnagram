document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("postForm");
  const input = document.getElementById("postInput");
  const feed = document.getElementById("feed");
  const search = document.getElementById("searchInput");

  const blockedWords = [
    "porn",
    "xxx",
    "پورن",
    "سکس",
    "برهنه",
    "هرزه"
  ];

  function createPost(content) {
    const post = document.createElement("article");
    post.className = "post";

    const title = document.createElement("h3");
    title.textContent = "کاربر یسناگرام";

    const paragraph = document.createElement("p");
    paragraph.textContent = content;

    const actions = document.createElement("div");
    actions.className = "post-actions";

    const likeButton = document.createElement("button");
    likeButton.type = "button";
    likeButton.textContent = "♡ پسندیدن";

    let liked = false;

    likeButton.addEventListener("click", function () {
      liked = !liked;
      likeButton.textContent = liked
        ? "♥ پسندیدم"
        : "♡ پسندیدن";
    });

    actions.appendChild(likeButton);
    post.appendChild(title);
    post.appendChild(paragraph);
    post.appendChild(actions);

    return post;
  }

  if (form && input && feed) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const content = input.value.trim();

      if (!content) {
        alert("لطفاً متن پست را بنویس.");
        return;
      }

      const normalized = content.toLowerCase();

      if (blockedWords.some(word => normalized.includes(word))) {
        alert("این محتوا در یسناگرام مجاز نیست.");
        return;
      }

      feed.prepend(createPost(content));
      input.value = "";
    });
  }

  if (search && feed) {
    search.addEventListener("input", function () {
      const query = search.value.trim().toLowerCase();

      feed.querySelectorAll(".post").forEach(function (post) {
        post.hidden = !post.textContent.toLowerCase().includes(query);
      });
    });
  }

  console.log("YASNAGRAM READY");
});

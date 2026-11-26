/* YASNAGRAM - Main JavaScript */

document.addEventListener("DOMContentLoaded", () => {
  const feed = document.querySelector("#feed, .feed");
  const postForm = document.querySelector("#postForm, .post-form");
  const postInput = document.querySelector("#postInput, #postText, textarea");
  const filterInput = document.querySelector("#searchInput, #search");

  // انتشار پست
  if (postForm && postInput) {
    postForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const content = postInput.value.trim();
      if (!content) return;

      const blockedWords = [
        "porn", "xxx", "سکس", "پورن", "برهنه", "هرزه"
      ];

      const normalized = content.toLowerCase();

      if (blockedWords.some(word => normalized.includes(word))) {
        alert("انتشار این محتوا در یسناگرام ممنوع است.");
        return;
      }

      if (!feed) {
        alert("بخش نمایش پست‌ها پیدا نشد.");
        return;
      }

      const post = document.createElement("article");
      post.className = "post";

      const text = document.createElement("p");
      text.textContent = content;

      const actions = document.createElement("div");
      actions.className = "post-actions";

      const likeButton = document.createElement("button");
      likeButton.type = "button";
      likeButton.textContent = "♡ پسندیدن";

      let liked = false;

      likeButton.addEventListener("click", () => {
        liked = !liked;
        likeButton.textContent = liked ? "♥ پسندیدم" : "♡ پسندیدن";
      });

      actions.appendChild(likeButton);
      post.appendChild(text);
      post.appendChild(actions);

      feed.prepend(post);
      postInput.value = "";
    });
  }

  // جست‌وجوی پست‌ها
  if (filterInput && feed) {
    filterInput.addEventListener("input", () => {
      const query = filterInput.value.trim().toLowerCase();

      feed.querySelectorAll(".post").forEach(post => {
        post.hidden = !post.textContent.toLowerCase().includes(query);
      });
    });
  }

  // نمایش و بستن پنجره‌ها
  document.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.open);
      if (target) target.hidden = false;
    });
  });

  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
      const target = button.closest(".modal");
      if (target) target.hidden = true;
    });
  });

  // منوی موبایل
  const menuButton = document.querySelector("#menuButton");
  const menu = document.querySelector("#mainMenu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  console.log("YASNAGRAM loaded successfully");
});

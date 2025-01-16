import {
  getAllPostsByUser,
  getPost,
  getAllPostsForFeedByUser,
  createPost,
  updatePost,
  deletePost,
} from "@controllers/postController";
import * as postService from "@services/postService";

jest.mock("@services/postService");

describe("Post Controllers", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe("getAllPostsByUser", () => {
    it("should return posts by a user", async () => {
      req.params.user_id = "1";
      const mockPosts = [
        {
          id: "1",
          title: "Post 1",
          user_id: "123",
          post_picture: "xyz.com",
          rating: 4,
          caption: "Test Caption",
          location: "Test, TX",
        },
        {
          id: "2",
          title: "Post 2",
          user_id: "123",
          post_picture: "abc.com",
          rating: 5,
          caption: "Test Caption 2",
          location: "Test, TX",
        },
        {
          id: "3",
          title: "Post 3",
          user_id: "123",
          post_picture: "def.com",
          rating: 2,
          caption: "Test Caption 3",
          location: "Test, TX",
        },
      ];

      jest.spyOn(postService, "getPostsByUser").mockResolvedValue(mockPosts);

      await getAllPostsByUser(req, res, jest.fn());

      expect(postService.getPostsByUser).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 404 if no posts are found for a user", async () => {
      req.params.user_id = "1";

      jest.spyOn(postService, "getPostsByUser").mockResolvedValue(null);

      await getAllPostsByUser(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No posts found for this user",
      });
    });

    it("should return 500 if an error occurs during getting posts for a user", async () => {
      jest
        .spyOn(postService, "getPostsByUser")
        .mockRejectedValueOnce(new Error("Internal server error"));

      req.params.user_id = "1";
      await getAllPostsByUser(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getPostById", () => {
    it("should return a post", async () => {
      req.params.id = "1";
      const mockPost = {
        id: "1",
        title: "Post 1",
        user_id: "123",
        post_picture: "xyz.com",
        rating: 4,
        caption: "Test Caption",
        location: "Test, TX",
      };
      jest.spyOn(postService, "getPostById").mockResolvedValue(mockPost);

      await getPost(req, res, jest.fn());

      expect(postService.getPostById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it("should return 404 if no post is found", async () => {
      req.params.id = "1";
      jest.spyOn(postService, "getPostById").mockResolvedValue(null);

      await getPost(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "No post found" });
    });

    it("should return 500 if an error occurs during getting a post", async () => {
      req.params.id = "1";
      jest
        .spyOn(postService, "getPostById")
        .mockRejectedValue(new Error("Internal server error"));

      await getPost(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("getAllPostsForFeedByUser", () => {
    it("should return posts for a user feed", async () => {
      req.params.user_id = "1";
      const mockPosts = [
        {
          id: "1",
          title: "Post 1",
          user_id: "123",
          post_picture: "xyz.com",
          rating: 4,
          caption: "Test Caption",
          location: "Test, TX",
        },
        {
          id: "2",
          title: "Post 2",
          user_id: "456",
          post_picture: "abc.com",
          rating: 5,
          caption: "Test Caption 2",
          location: "Test, TX",
        },
        {
          id: "3",
          title: "Post 3",
          user_id: "789",
          post_picture: "def.com",
          rating: 3,
          caption: "Test Caption 3",
          location: "Test, TX",
        },
      ];
      jest
        .spyOn(postService, "getPostsForFeedByUser")
        .mockResolvedValue(mockPosts);

      await getAllPostsForFeedByUser(req, res, jest.fn());

      expect(postService.getPostsForFeedByUser).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 404 if no posts are found in a user feed", async () => {
      req.params.user_id = "1";

      jest.spyOn(postService, "getPostsForFeedByUser").mockResolvedValue(null);

      await getAllPostsForFeedByUser(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No feed posts found for this user",
      });
    });

    it("should return 500 if an error occurs during getting posts for a feed", async () => {
      req.params.user_id = "1";

      jest
        .spyOn(postService, "getPostsForFeedByUser")
        .mockRejectedValue(new Error("Internal server error"));

      await getAllPostsForFeedByUser(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error",
      });
    });
  });

  describe("createPost", () => {
    it("should create a post", async () => {
      req.body = { post: { title: "New Post" }, recipe: { id: "1" } };

      jest.spyOn(postService, "createNewPost").mockResolvedValue();

      await createPost(req, res, jest.fn());

      expect(postService.createNewPost).toHaveBeenCalledWith(
        req.body.post,
        req.body.recipe
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post created successfully",
      });
    });

    it("should return 500 if an error occurs during creating a post", async () => {
      req.body = { post: { title: "New Post" }, recipe: { id: "1" } };

      jest
        .spyOn(postService, "createNewPost")
        .mockRejectedValue(new Error("Internal server error"));

      await createPost(req, res, jest.fn());

      expect(postService.createNewPost).toHaveBeenCalledWith(
        req.body.post,
        req.body.recipe
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error",
      });
    });
  });

  describe("updatePost", () => {
    it("should update a post", async () => {
      req.params.id = "1";
      req.body = { title: "Updated Post" };

      jest.spyOn(postService, "updatePostById").mockResolvedValue();

      await updatePost(req, res, jest.fn());

      expect(postService.updatePostById).toHaveBeenCalledWith("1", req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post 1 updated successfully",
      });
    });

    it("should return 500 if an error occurs during updating a post", async () => {
      req.params.id = "1";
      req.body = { title: "Updated Post" };

      jest
        .spyOn(postService, "updatePostById")
        .mockRejectedValue(new Error("Internal server error"));

      await updatePost(req, res, jest.fn());

      expect(postService.updatePostById).toHaveBeenCalledWith("1", req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error",
      });
    });
  });

  describe("deletePost", () => {
    it("should delete a post", async () => {
      req.params.id = "1";

      jest.spyOn(postService, "deletePostById").mockResolvedValue();

      await deletePost(req, res, jest.fn());

      expect(postService.deletePostById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post 1 deleted successfully",
      });
    });

    it("should return 500 if an error occurs during deleting a post", async () => {
      req.params.id = "1";

      jest
        .spyOn(postService, "deletePostById")
        .mockRejectedValue(new Error("Internal server error"));

      await deletePost(req, res, jest.fn());

      expect(postService.deletePostById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Internal server error",
      });
    });
  });
});

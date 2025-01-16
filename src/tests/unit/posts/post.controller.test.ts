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
    it("should return 200 with posts if found", async () => {
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
      ];

      jest.spyOn(postService, "getPostsByUser").mockResolvedValue(mockPosts);

      await getAllPostsByUser(req, res, jest.fn());

      expect(postService.getPostsByUser).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 404 if no posts are found", async () => {
      req.params.user_id = "1";

      jest.spyOn(postService, "getPostsByUser").mockResolvedValue(null);

      await getAllPostsByUser(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No posts found for this user",
      });
    });
  });

  describe("getPostById", () => {
    it("should return 200 with a post if found", async () => {
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
  });

  describe("getAllPostsForFeedByUser", () => {
    it("should return 200 with feed posts if found", async () => {
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
      ];
      jest
        .spyOn(postService, "getPostsForFeedByUser")
        .mockResolvedValue(mockPosts);

      await getAllPostsForFeedByUser(req, res, jest.fn());

      expect(postService.getPostsForFeedByUser).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 404 if no feed posts are found", async () => {
      req.params.user_id = "1";

      jest.spyOn(postService, "getPostsForFeedByUser").mockResolvedValue(null);

      await getAllPostsForFeedByUser(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "No feed posts found for this user",
      });
    });
  });

  describe("createPost", () => {
    it("should return 200 on successful post creation", async () => {
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
  });

  describe("updatePost", () => {
    it("should return 200 on successful post update", async () => {
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
  });

  describe("deletePost", () => {
    it("should return 200 on successful post deletion", async () => {
      req.params.id = "1";

      jest.spyOn(postService, "deletePostById").mockResolvedValue();

      await deletePost(req, res, jest.fn());

      expect(postService.deletePostById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post 1 deleted successfully",
      });
    });
  });
});

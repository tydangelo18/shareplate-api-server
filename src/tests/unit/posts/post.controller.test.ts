import {
  getAllPostsByUser,
  getPost,
  getAllPostsForFeedByUser,
  createPost,
  updatePost,
  deletePost,
} from "@controllers/postController";
import {
  getPostsByUser,
  getPostById,
  getPostsForFeedByUser,
  createNewPost,
  updatePostById,
  deletePostById,
} from "@services/postService";

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
      const mockPosts = [{ id: "1", title: "Post 1" }];
      (getPostsByUser as jest.Mock).mockResolvedValue(mockPosts);

      await getAllPostsByUser(req, res, jest.fn());

      expect(getPostsByUser).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 404 if no posts are found", async () => {
      req.params.user_id = "1";
      (getPostsByUser as jest.Mock).mockResolvedValue(null);

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
      const mockPost = { id: "1", title: "Post 1" };
      (getPostById as jest.Mock).mockResolvedValue(mockPost);

      await getPost(req, res, jest.fn());

      expect(getPostById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPost);
    });

    it("should return 404 if no post is found", async () => {
      req.params.id = "1";
      (getPostById as jest.Mock).mockResolvedValue(null);

      await getPost(req, res, jest.fn());

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "No post found" });
    });
  });

  describe("getAllPostsForFeedByUser", () => {
    it("should return 200 with feed posts if found", async () => {
      req.params.user_id = "1";
      const mockPosts = [{ id: "1", title: "Feed Post 1" }];
      (getPostsForFeedByUser as jest.Mock).mockResolvedValue(mockPosts);

      await getAllPostsForFeedByUser(req, res, jest.fn());

      expect(getPostsForFeedByUser).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPosts);
    });

    it("should return 404 if no feed posts are found", async () => {
      req.params.user_id = "1";
      (getPostsForFeedByUser as jest.Mock).mockResolvedValue(null);

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
      (createNewPost as jest.Mock).mockResolvedValue({
        id: "1",
        title: "Test Post",
      });

      await createPost(req, res, jest.fn());

      expect(createNewPost).toHaveBeenCalledWith(
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
      (updatePostById as jest.Mock).mockResolvedValue({
        id: "1",
        title: "Updated Test Post",
      });

      await updatePost(req, res, jest.fn());

      expect(updatePostById).toHaveBeenCalledWith("1", req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post 1 updated successfully",
      });
    });
  });

  describe("deletePost", () => {
    it("should return 200 on successful post deletion", async () => {
      req.params.id = "1";
      (deletePostById as jest.Mock).mockResolvedValue({ success: true });

      await deletePost(req, res, jest.fn());

      expect(deletePostById).toHaveBeenCalledWith("1");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post 1 deleted successfully",
      });
    });
  });
});

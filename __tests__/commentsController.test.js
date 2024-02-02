const commentsModel = require("../model/commentsModel");
const { createComment, getComment } = require("../controller/commentsController"); // Replace 'yourFileName' with the actual name of the file

jest.mock("../model/commentsModel");

describe("commentsController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createComment", () => {
    test("should create a new comment", async () => {
      const req = {
        body: {
          mbti: "INFP",
          enneagram: "4",
          zodiac: "Cancer",
          profileId: "123",
          title: "Test Comment",
          description: "This is a test comment",
        },
      };
      const res = {
        json: jest.fn(),
      };

      commentsModel.prototype.save.mockResolvedValueOnce();

      await createComment(req, res);

      expect(commentsModel).toHaveBeenCalledWith({
        mbti: "INFP",
        enneagram: "4",
        zodiac: "Cancer",
        profileId: "123",
        title: "Test Comment",
        description: "This is a test comment",
      });
      expect(commentsModel.prototype.save).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({ msg: "data added successfully....!" });
    });

    test("should handle error during comment creation", async () => {
      const req = {
        body: {
          // Missing required fields for the sake of triggering an error
        },
      };
      const res = {
        json: jest.fn(),
      };

      await createComment(req, res);

    
    });
  });

  describe("getComment", () => {
    test("should get a specific comment by ID", async () => {
      const req = {
        params: {
          id: "123",
          
        }, 
        query :{
            sort:"Best" ,
            filter: "All"
        }
      };
      const res = {
        json: jest.fn(),
      };

      const mockComment = { _id: "123", title: "Test Comment" };
      commentsModel.findById.mockResolvedValueOnce(mockComment);

      await getComment(req, res);

      expect(commentsModel.findById).toHaveBeenCalledWith("123");
      expect(res.json).toHaveBeenCalledWith(mockComment);
    });

    test("should get comments with sorting and filtering", async () => {
      const req = {
        query: {
          sort: "Best",
          filter: "mbti",
        },
        params: {
            id: "456",
          },
        query :{
            sort:"Best" ,
            filter: "All"
        }
      };
      const res = {
        json: jest.fn(),
      };

      const mockComments = [{ _id: "1", mbti: "INFP" }, { _id: "2", mbti: "INTJ" }];
      commentsModel.find.mockResolvedValueOnce(mockComments);

      await getComment(req, res);
    });

    test("should handle error during comment retrieval", async () => {
      const req = {
        params: {
          id: "456",
        },
        query :{
            sort:"Best" ,
            filter: "All"
        }
      };
      const res = {
        json: jest.fn(),
      };

      // Simulating an error during findById
      commentsModel.findById.mockRejectedValueOnce(new Error("Some error"));

      await getComment(req, res);

      expect(commentsModel.findById).toHaveBeenCalledWith("456");
  
    });
  });
});

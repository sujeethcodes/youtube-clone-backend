const handler = require("express-async-handler");

const Post = require("../model/post.model");
const Creator = require("../model/creator.model");
const helperUtils = require("../utils/helper.utils");
const uploadUtils = require("../utils/upload.utils");
const User = require("../model/user.model");
const Subscribe = require("../model/subscribe.model");
const constantUtils = require("../utils/constant.utils");
const Shorts = require("../model/shorts.model");
const postLikeDisLike = require("../model/postLikeDislike.model");

const controller = {};

// CHANNEL CREATED
controller.createCreator = async (req, res) => {
  const creatorId = helperUtils.getRandomNumber(16);
  const channelId = helperUtils.getRandomNumber(20);
  const date = new Date().toLocaleString().split(",")[0];

  if (!channelId) throw "400|CHANNEL_ID_REQUIRED";
  if (!date) throw "400|DATE_REQUIRED";
  if (!creatorId) throw "400|CREATOR_ID_REQUIRED";
  if (!req?.body?.userId) throw "400|INVAILD_USER_ID";
  if (!req?.body?.channelName) throw "400|INVAILD_CHANNEL_NAME";
  if (!req?.body?.channelCategories) throw "400|INVAILD_CHANNEL_CATEGORIES";

  const creator = await Creator.create({
    userId: req?.body?.userId,
    creatorId: creatorId,

    channelName: req?.body?.channelName,
    channelId: channelId,
    channelCategories: req?.body?.channelCategories,
    date: date,
  });

  if (!creator) throw "SOMETHING_WENT_WRONG";
  return res.json({ message: "SUCCESS" });
};

// CHANNEL EDITED
controller.editCreator = handler(async (req, res) => {
  const editCreator = await Creator.findOne({
    creatorId: req?.body?.creatorId,
  });

  if (req?.body?.channelName) {
    editCreator.channelName = req?.body?.channelName;
  }
  if (req?.body?.channelCategories) {
    editCreator.channelCategories = req?.body?.channelCategories;
  }
  if (req?.file?.creatorProfile) {
    editCreator.creatorProfile = await uploadUtils.profileUpload(
      constantUtils.CREATOR_POST,
      req?.file?.creatorProfile
    );
  }

  await editCreator.save();

  res.json({ message: "SUCCESS" });
});

// CHANNEL CREATORS
controller.getCreator = handler(async (req, res) => {
  const getCreator = await Creator.findOne({
    where: {
      creatorId: req?.body?.creatorId,
    },
    include: {
      model: User,
    },
  });
  if (!getCreator) throw "INVAILD_CREATOR_DETAILS";
  return res.json({
    userName: getCreator?.user?.userName,
    email: getCreator?.user?.email,
    channelName: getCreator?.channelName,
    channelCategories: getCreator?.channelCategories,
    channelCreatedDate: getCreator?.date,
  });
});

// GET ALL CREATORS
controller.getAllCreators = handler(async (req, res) => {
  const getAllCreators = await Creator.findAll({
    order: [["id", "DESC"]],
  });
  return res.json(getAllCreators);
});

controller.getCategoreisBasedCreator = handler(async (req, res) => {
  const newsCategories = await Creator.findAll({
    where: {
      channelCategories: "news",
    },
  });

  const moviesCategories = await Creator.findAll({
    where: {
      channelCategories: "movies",
    },
  });

  const songsCategories = await Creator.findAll({
    where: {
      channelCategories: "songs",
    },
  });

  const sportsCategories = await Creator.findAll({
    where: {
      channelCategories: "sports",
    },
  });

  return res.json({
    newsCategories,
    moviesCategories,
    songsCategories,
    sportsCategories,
  });
});

// CHANNEL DELETE
controller.deleteCreator = handler(async (req, res) => {
  const deleteCreator = await Creator.destroy({
    where: {
      creatorId: req?.body?.creatorId,
    },
  });
  if (!deleteCreator) throw "INVAILD_CREATOR_ID";

  return res.json({ message: "CHANNEL_DELETED" });
});

// POST CONTENT
controller.createPost = handler(async (req, res) => {
  const date = new Date().toLocaleString().split(",")[0];
  const postId = helperUtils.getRandomNumber(20);

  if (!date) throw "400|DATE_REQUIRED";
  if (!postId) throw "400|POST_ID_REQUIRED";
  if (!req?.body?.creatorId) throw "400|INVAILD_CREATOR_ID";
  if (!req?.file) throw "400|POST_REQUIRED";
  if (!req?.body?.description) throw "400|DESCRIPTION_REQUIRED";
  if (!req?.body?.title) throw "400|TITLE_REQUIRED";
  if (!req?.body?.language) throw "400|LANGUAGE_REQUIRED";
  if (!req?.body?.categories) throw "400|CATEGORIES_REQUIRED";

  const post = await Post.create({
    creatorId: req?.body?.creatorId,
    post: await uploadUtils.videoUpload(
      constantUtils.CREATOR_POST,
      req.file.buffer
    ),
    postId: postId,
    description: req?.body?.description,
    title: req?.body?.title,
    language: req?.body?.language,
    categories: req?.body?.categories,
    // compressedPost: compressedPost,
    date: date,
  });

  if (!post) {
    return res.json({ message: 500, status: "SOMETHING_WENT_WRONG" });
  } else {
    return res.json({ message: 200, status: "SUCCESSFULLY_UPLOADED" });
  }
});

//GET CREATOR CONTENT
controller.getPost = handler(async (req, res) => {
  const getPost = await Post.findAll({
    where: {
      creatorId: req?.body?.creatorId,
    },
    order: [["id", "DESC"]],
  });
  return res.json(
    getPost.map((each) => ({
      creatorId: each?.creatorId,
      post: helperUtils.getImageUrl(each?.post),
      postId: each?.postId,
      language: each?.language,
      categories: each?.categories,
      title: each?.title,
      description: each?.description,
      date: each?.date,
    }))
  );
});

// GET ALL CREATOR CONTENT
controller.getAllPost = handler(async (req, res) => {
  const getAllPost = await Post.findAll({
    order: [["id", "DESC"]],
    offset: req?.body?.offset ?? 0,
    limit: req?.body?.limit ?? 25,

    include: {
      model: Creator,
    },
  });

  return res.json({
    status: 200,

    getAllPost: getAllPost.map((each) => ({
      creatorId: each?.creatorId,
      post: helperUtils.getPostUrl(each?.post),
      postId: each?.postId,
      compressedPost: each?.compressedPost,
      language: each?.language,
      categories: each?.categories,
      title: each?.title,
      description: each?.description,
      data: each?.date,
      channelName: each?.creator?.channelName,
      channelProfile: helperUtils.getPostUrl(each?.creator?.creatorProfile),
      userId: each?.userId,
    })),
  });
});

// LIKE_POST

controller.like = handler(async (req, res) => {
  if (!req?.body?.postId) "POSTID_REQUIRED";

  const ifPost = await Post.findOne({
    where: {
      postId: req?.body?.postId,
    },
  });
  if (!ifPost) throw "INVAILD_POST_ID";

  if (![constantUtils.LIKE, constantUtils.UN_LIKE].includes(req?.body?.like))
    throw "INVAILD_LIKE_VALUE";

  if (req?.body?.like === constantUtils.LIKE) {
    const ifLike = await postLikeDisLike.findOne({
      where: {
        postId: req?.body?.postId,
        userId: req?.body?.userId,
        likes: req?.body?.like,
      },
    });

    if (ifLike) throw "ALREDY_YOU_LIKED_THIS_POST";

    const ifDisLike = await postLikeDisLike.findOne({
      where: {
        postId: req?.body?.postId,
        userId: req?.body?.userId,
        disLike: 1,
      },
    });
    if (ifDisLike) {
      const dislike = await postLikeDisLike.destroy({
        where: {
          postId: req?.body?.postId,
          userId: req?.body?.userId,
        },
      });
    }

    const like = await postLikeDisLike.create({
      postId: req?.body?.postId,
      userId: req?.body?.userId,
      likes: req?.body?.like,
      date: new Date(),
    });
    if (!like) throw "SOMETHING_WENT_WRONG";
    if (like) {
      const showLike = await postLikeDisLike.findOne({
        where: {
          postId: like?.postId,
          userId: like?.userId,
          likes: like?.likes,
        },
      });
      if (showLike) {
        return res.json(showLike);
      }
    }
  }

  if (req?.body?.like === constantUtils.UN_LIKE) {
    const unLike = await postLikeDisLike.destroy({
      where: {
        postId: req?.body?.postId,
        userId: req?.body?.userId,
      },
    });
    if (!unLike) throw "SOMETHING_WENT_WRONG";
    if (unLike) {
      return res.json("UN_LIKE");
    }
  }
});

// DIS_LIKE_POST
controller.disLike = handler(async (req, res) => {
  if (!req?.body?.postId) "POSTID_REQUIRED";

  if (
    ![constantUtils.DISLIKE, constantUtils.UN_DISLIKE].includes(req?.body?.like)
  )
    throw "INVAILD_LIKE_VALUE";

  const ifPost = await Post.findOne({
    where: {
      postId: req?.body?.postId,
    },
  });

  if (!ifPost) throw "INVAILD_POST_ID";

  if (req?.body?.like === constantUtils.DISLIKE) {
    const ifDisLike = await postLikeDisLike.findOne({
      where: {
        postId: req?.body?.postId,
        userId: req?.body?.userId,
        disLike: req?.body?.like,
      },
    });
    if (ifDisLike) throw "YOU_ALREDY_DIS_LIKE_THIS_VIDEO";

    const ifLike = await postLikeDisLike.findOne({
      where: {
        postId: req?.body?.postId,
        userId: req?.body?.userId,
        likes: 1,
      },
    });
    if (ifLike) {
      const like = await postLikeDisLike.destroy({
        where: {
          postId: req?.body?.postId,
          userId: req?.body?.userId,
        },
      });
    }

    const disLike = await postLikeDisLike.create({
      postId: ifPost?.postId,
      userId: req?.body?.userId,
      disLike: req?.body?.like,
      date: new Date(),
    });
    if (disLike) {
      return res.json("DISLIKE");
    }
  }

  if (req?.body?.like === constantUtils.UN_DISLIKE) {
    const unLike = await postLikeDisLike.destroy({
      where: {
        postId: ifPost?.postId,
        userId: req?.body?.userId,
      },
    });
    if (!unLike) throw "SOMETHING_WENT_WRONG";
    return res.json("UN_DISLIKE");
  }
});

// GET LIKE & DISLIKE
controller.getLike = handler(async (req, res) => {
  if (!req?.body?.postId) throw "POST_ID_REQUIRED";
  if (!req?.body?.userId) throw "USER_ID_REQUIRED";
  const getLike = await postLikeDisLike.findOne({
    where: {
      userId: req?.body?.userId,
      postId: req?.body?.postId,
    },

    include: {
      model: Post,
    },
  });
  if (getLike) {
    return res.json({
      like: getLike?.likes,
      disLike: getLike?.disLike,
      postId: getLike?.postId,
    });
  } else {
    return res.json("you not like or dislike this video");
  }
});

// SUBSCRIBE CHANNEL
controller.setSubscribedChannel = handler(async (req, res) => {
  if (!req?.body?.userId) throw "USER_ID_REQUIRED";
  if (!req?.body?.creatorId) throw "CREATOR_ID_REQUIRED";

  if (req?.body?.subscribe === true) {
    const ifUserId = await Subscribe.findOne({
      where: {
        userId: req?.body?.userId,
        creatorId: req?.body?.creatorId,
        subscribe: 1,
      },
    });
    if (ifUserId) throw res.json({ message: "ALREADY SUBSCRIBED" });

    const createSuSscribe = await Subscribe.create({
      userId: req?.body?.userId,
      creatorId: req?.body?.creatorId,
      subscribe: req?.body?.subscribe,
    });
    if (createSuSscribe) {
      return res.json(createSuSscribe);
    } else {
      return res.json("SOMETHING_WENT_WRONG");
    }
  }

  if (req?.body?.subscribe === false) {
    const unSubscribe = await Subscribe.destroy({
      where: {
        userId: req?.body?.userId,
        creatorId: req?.body?.creatorId,
      },
    });
    if (unSubscribe) {
      return res.json("UN_SUBSCRIBE");
    }
  }
});

// GET SINGLE USER SUBSCRIBED CHANNEL
controller.subscribedChannel = handler(async (req, res) => {
  if (!req?.body?.userId) throw "USERID_REQUIRED";
  if (!req?.body?.creatorId) throw "CREATOR_REQUIRED";
  const subscribedChannel = await Subscribe.findOne({
    where: {
      userId: req?.body?.userId,
      creatorId: req?.body?.creatorId,
    },
  });
  if (!subscribedChannel) throw "INVAILD_USER_ID";
  return res.json(subscribedChannel);
});

// GET SHORTS VIEW SUBSCRIBE

controller.getShortsViewSubscribedChannel = handler(async (req, res) => {
  const getShortsViewSubscribedChannel = await Subscribe.findAll({});
  if (getShortsViewSubscribedChannel) {
    return res.json(getShortsViewSubscribedChannel);
  } else {
    return res.json("SOMETHING_WENT_WROMG");
  }
});

//POST SHORTS
controller.postShorts = async (req, res) => {
  if (!req?.body?.creatorId) throw "CREATOR_ID_REQUIRED";
  const postShorts = await Shorts.create({
    creatorId: req?.body?.creatorId,
    shorts: await uploadUtils.videoUpload(
      constantUtils.CREATOR_POST,
      req?.file.buffer
    ),
    date: new Date(),
  });
  if (!postShorts) throw "INVAILD_SHORTS";
  return res.json({ message: "SHORTS_UPLOAD_SUCCESSFULLY" });
};

controller.getShorts = handler(async (req, res) => {
  if (!req?.body?.creatorId) throw "CREATOR_ID_REQUIRED";
  const getShorts = await Shorts.findOne({
    where: {
      creatorId: req?.body?.creatorId,
    },
  });
  if (!getShorts) throw "SOMETHING_WENT_WRONG";
  return res.json(getShorts);
});

controller.getAllShorts = handler(async (req, res) => {
  const getAllShorts = await Shorts.findAll({
    order: [["id", "DESC"]],
    include: {
      model: Creator,
      attribute: ["userId"],
    },
  });
  return res.json(
    // getAllShorts
    getAllShorts?.map((each) => ({
      creatorId: each?.creatorId,
      shorts: helperUtils.getPostUrl(each?.shorts),
      date: each?.date,
      channelName: each?.creator?.channelName,
      creatorProfile: helperUtils.getPostUrl(each?.creator?.creatorProfile),
      userId: each?.creator?.userId,
    }))
  );
});

module.exports = controller;

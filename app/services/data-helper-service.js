const lodash = require("lodash");
const { convertDateToFormat } = require("@services/date-service");
module.exports.makeRecursiveCommentsStructure = async (comments) => {
  const groupedComments = lodash.groupBy(comments, "parentId");

  let newComments = [];
  for (let index = 0; index < comments.length; index++) {
    const element = comments[index];

    element.created_at_persian = convertDateToFormat(
      element.created_at,
      "HH:mm jYYYY/jMM/jDD"
    );

    if (groupedComments[element.id]) {
      element.children
        ? element.children.push(...groupedComments[element.id])
        : (element.children = [...groupedComments[element.id]]);
      newComments.push(element);
    }

    if (!element.parentId) {
      newComments.push(element);
    }
  }
  return await newComments;
};

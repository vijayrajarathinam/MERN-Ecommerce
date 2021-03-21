const RESULT_PER_PAGE = Number(process.env.RESULT_PER_PAGE);

class ApiUtils {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);
    this.query = this.query.find({ ...keyword });

    return this;
  }

  filter() {
    const searchfields = { ...this.queryStr };
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete searchfields[el]);

    let queryStr = JSON.stringify(searchfields);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    resultPerPage = resultPerPage || RESULT_PER_PAGE;
    const current = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (current - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiUtils;

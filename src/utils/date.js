export const getFormatedDate = (item) => {
  return `${new Date(
    item?.createdDate || item?.joinedDate
  ).getDate()}-${new Date(
    item?.createdDate || item?.joinedDate
  ).getMonth()}-${new Date(
    item?.createdDate || item?.joinedDate
  ).getFullYear()}`;
};

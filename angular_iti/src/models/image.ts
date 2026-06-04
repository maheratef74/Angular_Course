export class Image {
  imageUrl: string;

  constructor(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}

export const IMAGES_DATA: Image[] = [
  new Image(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBJ2kyNPTquCll2Yp7HYYObqStG6R6L4q-o6xjXXOkyqBucHmwbTpEEouXoMMO_A_BZ1CPtvNfKk2-7RheJ14_19AmS9ysbnskxxd7YtLC&s=10'
  ),
  new Image(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWA_M7CRo9-71hraLG70CBJLWqoIVvoxhbYC70tpqh-DyICS9XLhC8wFxZUpc3BMXiZzHc0FJI9LuWRvDNfvwWqg2YM5XzKxNB_lp91hu85g&s=10'
  ),
  new Image(
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpxP4EPFwUgxqUWWGFzXfFG7mkMvrNJ7tHnyE-LeM_URfk9PRfnWdw205sVnvNnbUp9xBoXvNcGQc7iMtBsXq5FTARN1G5vsQBW3-Gbhc-uQ&s=10'
  )
];

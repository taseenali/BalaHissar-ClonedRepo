
export interface Review {
  id: number;
  name: string;
  initial: string;
  rating: number;
  text: string;
  time: string;
  categories?: {
    food?: number;
    service?: number;
    atmosphere?: number;
  };
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "Bakht Said",
    initial: "B",
    rating: 5,
    time: "3 months ago",
    text: "Had a wonderful experience at Bala Hisar Restaurant. The buffet was excellent with a great variety of delicious and well-presented dishes. Everything was fresh, flavorful, and perfectly cooked. A special mention to Arshad Bhai his warm welcome, friendly attitude, and excellent hospitality truly made our visit memorable. He was very polite, attentive, and ensured we felt comfortable throughout our time there. Highly recommended for anyone looking for great food and outstanding service. Will definitely visit again!",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 2,
    name: "Zubeda Khatoon",
    initial: "Z",
    rating: 5,
    time: "7 months ago",
    text: "The service as always was brilliant. Food was also nice, the only thing I would say is the Kabli pilau could have had a bit more meat in it. It was my first time visiting since the service has become a buffet. During my previous visits the kabli pilau came with a lamb shank and that was brilliant! Overall my friend and I had a lovely evening out and we were even given 2 kaavas on the house. It was a very reasonable price as well so overall a win win!",
    categories: {
      food: 4,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 3,
    name: "Honey",
    initial: "H",
    rating: 5,
    time: "3 months ago",
    text: "We visited for the first time after seeing so many good reviews on TikTok. We didn't realize an advance booking was required, but Mr. Anil Malik was amazing. he went out of his way to find us a table. The food was delicious, the staff was friendly, and the environment was perfect. Thank you, Mr. Malik, for the wonderful treatment!",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 4,
    name: "Suheeb Afzal",
    initial: "S",
    rating: 5,
    time: "4 months ago",
    text: "Nice deco, lovely place. Great hospitality and nice food. All I would say is open a little sooner like 4:30. Would definitely come again.",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 5,
    name: "Muhammad Chaudhary",
    initial: "M",
    rating: 5,
    time: "4 months ago",
    text: "It was absolutely amazing as when walking in I was welcomed by some friendly staff and a magnificent atmosphere. Their buffet has some very nice and spicy Asian foods . As a matter of fact , I suggest that anybody who likes food and pakistani things would fancy this amazing place. It is a brilliant place for when you want to have breakfast. I love this place as the food are so yummy that they all have different flavors to try.",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 6,
    name: "Amarah Shaid",
    initial: "A",
    rating: 5,
    time: "2 months ago",
    text: "From start to finish, everything was fantastic. The customer service was warm, from Aisha attentive, and genuinely welcoming—they made us feel taken care of without being overbearing. The food was just as impressive: fresh, flavorful, and clearly made with care. Every bite was delicious, and the quality really stood out. This place nails both great service and amazing food. Can't wait to come back.",
    categories: {
      food: 4,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 7,
    name: "Mao mao",
    initial: "M",
    rating: 5,
    time: "4 months ago",
    text: "Tried their buffet, it was so nice. They even gave us free drinks. Service was so nice and attentive. Food was tasty and fresh. Definitely recommended ❤️",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 8,
    name: "Nelly Shah",
    initial: "N",
    rating: 5,
    time: "5 months ago",
    text: "Came yesterday with my husband and toddler. Clean place, delicious food. And outstanding Service by Aysha bless her she kept coming over and checking if we needed anything! Lovely girl. Thank you will be back! Highly recommended to try kabuli pulao, bbq wings, chicken masala curry & chapli kebabs 👌",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  },
  {
    id: 9,
    name: "Kash",
    initial: "K",
    rating: 4,
    time: "3 months ago",
    text: "Lovely food and staff, we have been here several times and enjoyed every moment. I love the starters at the door, pani piri etc is amazing. The nahrini is outstanding. The only things I would change and I really hope the management take this onboard is the pokara bits, no need for them they just look like scraps, gulab jamuns are way to sweet, swap the kabuli pilau with a biryani and use basmati rice. I've seen on previous comments ppl query this but nothing has been done.",
    categories: {
      food: 4,
      service: 4,
      atmosphere: 4
    }
  },
  {
    id: 10,
    name: "Zeeshan Yaqoob",
    initial: "Z",
    rating: 5,
    time: "2 months ago",
    text: "Had food here today and it was a great experience. The food was fresh and tasty, the service was quick and friendly, and the place was clean and comfortable. Would definitely come again. Highly recommended.",
    categories: {
      food: 5,
      service: 5,
      atmosphere: 5
    }
  }
];

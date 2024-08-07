import React, { useEffect, useState } from "react";


export const recommendedPosts = [
  {
    postId: 1,
    user: "Tara Haelle",
    title:
      "We’re starting to understand more of what causes long COVID brain fog",
    subtitle: "Do this instead",
    desc: `Not only did a new study identify two blood proteins linked to cognitive difficulties a year 
    after COVID-19 infection, but the What is Lorem Ipsum?
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
    and scrambled it to make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
    desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    Why do we use it?
    It is a long established fact that a reader will be distracted by the readable content of a page
    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
    distribution of letters, as opposed to using 'Content here, content here', making it look like
    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
    their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
    their infancy. Various versions have evolved over the years, sometimes by accident, sometimes
    on purpose (injected humour and the like).
    Where does it come from?
    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
    Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
    words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10
    .32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
    written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
    Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
    line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
    in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    date: `Sep 13`,
    readTime: "7 min read",
    postImg:
      "https://miro.medium.com/v2/resize:fill:300:201/1*6nZUT6CkYE1frUF8eAVphw.jpeg",
    userImg:
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/142819271/original/09dafa4104fa6aeca4e62f33326be4933ae7ccac/create-cartoon-profile-picture-abd7.jpg",
  },
  {
    postId: 2,
    user: "Tara Haelle",
    title:
      "We’re starting to understand more of what causes long COVID brain fog",
    subtitle: "Do this instead",
    desc: `Not only did a new study identify two blood proteins linked to cognitive difficulties a year 
    after COVID-19 infection, but the What is Lorem Ipsum?
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
    and scrambled it to make a type specimen book. It has survived not only five centuries, but also
    the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
    1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
    desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    Why do we use it?
    It is a long established fact that a reader will be distracted by the readable content of a page
    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
    distribution of letters, as opposed to using 'Content here, content here', making it look like
    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
    their default model text, and a search for 'lorem ipsum' will uncover many web sites still in
    their infancy. Various versions have evolved over the years, sometimes by accident, sometimes
    on purpose (injected humour and the like).
    Where does it come from?
    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
    classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
    Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
    words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
    classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10
    .32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
    written in 45 BC. This book is a treatise on the theory of ethics, very popular during the
    Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a
    line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
    in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
    date: `Sep 13`,
    readTime: "7 min read",
    postImg:
      "https://miro.medium.com/v2/resize:fill:300:201/1*6nZUT6CkYE1frUF8eAVphw.jpeg",
    userImg:
      "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/142819271/original/09dafa4104fa6aeca4e62f33326be4933ae7ccac/create-cartoon-profile-picture-abd7.jpg",
  },
];

const useFetch = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    const fetchData = () => {
      setTimeout(() => {
        setData(recommendedPosts);
        setLoading(false);
      }, 1000); 
    };

    fetchData();
  }, [collectionName]);

  return {
    data,
    loading,
  };
};

export default useFetch;

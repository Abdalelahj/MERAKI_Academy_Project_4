import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import "./Detail.css";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <ImageList
    //   sx={{ width: 700, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
      className='imageList'
    >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://zen.wego.com/cdn-cgi/image/format=auto,height=185,quality=90/hotelz/100/26645121/105599070.jpg',
    title: 'meeting Room',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/388170479.jpg?k=48fc97feae29d537aa7b22588ce64fa7d574abfc0108c1d1336cafd4ee04ce3b&o=&hp=1',
    title: 'facilities',
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/485991127.jpg?k=a51905a7b198e5cd8d81b6db5ba198ef7ce74ba0dfdb792a0ffe2e8b451b4ab3&o=&hp=1',
    title: 'food',
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/430821448.jpg?k=4ab19f5f8da230f775767df346cf7e20166bad41ea8ff855cfc453e32631585e&o=&hp=1',
    title: '',
    cols: 2,
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/483742089.jpg?k=853eac10ecdff9b9975cc7cc5744f30944acc8bdbe7976869efc8f4b99b27e85&o=&hp=1',
    title: "Entrance",
    cols: 2,
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/471105726.jpg?k=0ec2c1f25bcdb340af1b83f9f2b48ea2c0cd71731d03ca9ea5b7af42b6356f3d&o=&hp=1',
    title: '',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/483742145.jpg?k=05c0099e13a88831b3efd71db051c6c52c1a87e579a85f636e3e9a0f7da97653&o=&hp=1',
    title: '',
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/557347536.jpg?k=7d5005666d6459ae6f9445970c7ebef3d44e1c1dca0261646a8844a1a9347373&o=&hp=1',
    title: '',
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/557347586.jpg?k=c477b2b4737d1702af0197fc7ece8cf2118fc5cd72b276fef78d3ac09348db3e&o=&hp=1',
    title: '',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/440224834.jpg?k=cdf5df91b0d3c93dd5c79abea42a9a753e65a80bac7c8c648e34c26b9626594d&o=&hp=1',
    title: '',
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/440221500.jpg?k=c439f2ea3dd3719bf23e1b4163ca1a0cb7446e0375ded395d5d4a2f5ad5f255d&o=&hp=1',
    title: '',
  },
  {
    img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/474823911.jpg?k=4c3dc8431dab7c30755da56438944d314bb58e14c88ac13458d5c994ad0a6f80&o=&hp=1',
    title: 'Bed',
    cols: 2,
  },
];

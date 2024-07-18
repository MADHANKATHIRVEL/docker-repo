'use client';
import './advantages.css';
import Image from "next/image";

const Advantages = ({
    extraServices,
    bgColor = 'transparent'
}) => {
  return (
    <div className="extra-req">
      {extraServices.map((item) => (
        <div
          className="extra-service-item"
          key={item.key}
          style={{ backgroundColor: bgColor }}
        >
          <Image
            placeholder="blur"
            src={item.logo}
            width={50}
            height={50}
            loading="lazy"
            alt="Advantage Logo"
          />
          <span className="title">{item.title}</span>
          <span className="description">{item.desc}</span>
        </div>
      ))}
    </div>
  );
}

export default Advantages
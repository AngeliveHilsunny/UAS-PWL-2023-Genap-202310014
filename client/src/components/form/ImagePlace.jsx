import Image from "./Image";

export default function ImagePlace({place,index=0,className=null}) {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover rounded-2xl w-full ';
  }
  return (
    <Image className={className} src={place.photos[index]} alt=""/>
  );
}
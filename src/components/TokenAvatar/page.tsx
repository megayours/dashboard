import React from 'react';
import { create } from 'ipfs-http-client';
const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' }); 

const TokenAvatar = ({ image, alt }: { image: string; alt: string }) => {
    const renderImage = async () => {
        if (image.startsWith('ipfs://')) {
            const ipfsHash = image.replace('ipfs://', '');
            return `https://ipfs.io/ipfs/${ipfsHash}`
        } else if (image.startsWith('http://') || image.startsWith('https://')) {
            return image; // Normal URL
        } else {
            return `data:image/png;base64,${image}`; // Base64
        }
    };

    const [imgSrc, setImgSrc] = React.useState<string | null>(null);

    React.useEffect(() => {
        if(image) {
        renderImage().then(setImgSrc);
        }
    }, [image]);

    return (
        <div>
            {imgSrc && <img src={imgSrc} alt={alt} className="object-cover w-full h-full" />}
        </div>
    );
};

export default TokenAvatar;

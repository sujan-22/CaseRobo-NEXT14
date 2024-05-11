interface ImageProps extends React.HTMLProps<HTMLImageElement> {
    src: string;
    alt: string;
}

const CustomImage: React.FC<ImageProps> = ({
    src,
    alt,
    className,
    ...props
}) => {
    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={className} alt={alt} src={src} {...props} />
        </>
    );
};

export default CustomImage;

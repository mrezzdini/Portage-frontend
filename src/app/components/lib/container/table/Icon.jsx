const Icon = ({ icon, className, style }) => {
    const IconComponent = icon; // Assuming 'icon' is a valid React component

    return <IconComponent className={className} style={style} />;
};
export default Icon;

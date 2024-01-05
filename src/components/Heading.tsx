interface HeadingPropsI {
    title: string;
    subtitle?: string;
}

export default function Heading({ title, subtitle }: HeadingPropsI) {
    return (
        <div className="mb-4">
            {subtitle && <h4 className="text-gray-4">{subtitle}</h4>}
            <h2 className="font-display font-semibold text-4xl capitalize">
                {title}
            </h2>
        </div>
    );
}

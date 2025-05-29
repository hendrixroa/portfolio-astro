export const createUrlBanner = (slug: string, bannerImage: string): string => {
    return '/blog/' + slug + '/' + bannerImage;
}
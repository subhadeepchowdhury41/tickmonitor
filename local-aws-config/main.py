import instaloader

def download_instagram_video(post_url):
    # Initialize Instaloader
    loader = instaloader.Instaloader()

    # Extract the shortcode from the URL
    shortcode = post_url.split('/')[-2]

    try:
        # Download the post using the shortcode
        post = instaloader.Post.from_shortcode(loader.context, shortcode)
        loader.download_post(post, target=f"{shortcode}_video")
        print(f"Downloaded video to {shortcode}_video directory.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    # Replace with your desired Instagram post URL
    insta_post_url = "https://www.instagram.com/reel/B9_cwJqnS3Y/"
    download_instagram_video(insta_post_url)

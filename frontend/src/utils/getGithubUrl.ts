export function getGitHubUrl(from: string) {
  const rootURl = 'https://github.com/login/oauth/authorize';

  const options = {
    client_id: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID as string,
    redirect_uri: process.env.REACT_APP_GITHUB_OAUTH_REDIRECT_URL as string,
    scope: 'user:email',
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootURl}?${qs.toString()}`;
}

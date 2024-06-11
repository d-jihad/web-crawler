function main() {
  const args = process.argv.length;

  if (args != 3) {
    console.log("Wrong arguments number");
    console.log("Usage: npm run start BASE_URL");
    return;
  }

  const inputUrl = process.argv[2];
  let baseURL;

  try {
    baseURL = new URL(inputUrl);
  } catch (error) {
    console.log("The input is not a valid url");
    return;
  }

  console.log(`Using ${baseURL} as start`);
}

main();

const getUrl = (params) => {
    // const url = "http://localhost:3000" + params;
    const url = "https://property-mng.vercel.app" + params; 
    console.log(url);
    return url;
}

export default getUrl;
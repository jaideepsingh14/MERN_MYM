const Image = require("../models/Image")
const axios = require("axios")

function getCurrentDate() {
  const t = new Date();
  const date = ('0' + t.getDate()).slice(-2);
  const month = ('0' + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
}


const getTodayImage = async (req, res, next) => {
  try {
    const cur_date = getCurrentDate();
    let todayImage = await Image.findOne({
    	date: cur_date
    })

    console.log("todayImage")
    console.log(todayImage)

    if(!todayImage){
      console.log("imagenotfoud")
      await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&thumbs=true')
        .then(async (response) => {
          console.log(response)
          console.log(response.data)

          const {media_type, title, explanation} = response.data

          const attr = media_type === 'video' ? 'thumbnail_url' : 'url'

          todayImage = await Image.create({
            date: cur_date,
            url: response.data[attr],
            title,
            explanation
          });
        })
        .catch(function (err) {
          console.log(err);
          return res.status(400).send("Server error");
        });
    }

    return res.status(200).json({data: todayImage});
  } catch (err) {
    console.log(err);
    return res.status(400).send("Server error");
  }
};

exports.getTodayImage=getTodayImage
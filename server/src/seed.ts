import mongoose from "mongoose";
import dotenv from "dotenv";
import Song from "./models/songModel";

dotenv.config();

const seedSongs = async () => {
  const songs = [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "Divide",
      genre: "Pop",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      genre: "R&B",
    },
    {
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      genre: "Pop",
    },
    {
      title: "Rockstar",
      artist: "Post Malone",
      album: "Beerbongs & Bentleys",
      genre: "Hip-Hop",
    },
    {
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      genre: "Alternative",
    },
    {
      title: "Sunflower",
      artist: "Post Malone",
      album: "Hollywood's Bleeding",
      genre: "Hip-Hop",
    },
    {
      title: "Old Town Road",
      artist: "Lil Nas X",
      album: "7 EP",
      genre: "Country",
    },
    {
      title: "Senorita",
      artist: "Shawn Mendes",
      album: "Shawn Mendes",
      genre: "Pop",
    },
    {
      title: "Circles",
      artist: "Post Malone",
      album: "Hollywood's Bleeding",
      genre: "Pop",
    },
    {
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      genre: "Pop",
    },
  ];

  try {
    await mongoose.connect(
      process.env.CONNECTION_STRING || "mongodb://localhost:27017/musicapp"
    );
    await Song.insertMany(songs);
    console.log("Data seeded successfully");
    mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
};

seedSongs();

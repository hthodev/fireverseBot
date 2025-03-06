import axios from "axios";
import fs from "fs/promises";
import { ethers } from "ethers";

console.log("TOOL ĐƯỢC PHÁT TRIỂN BỞI: THIEN THO TRAN");
console.log(
  "Tham gia group facebook để nhận tool mới: https://www.facebook.com/groups/2072702003172443/"
);
console.log("------------------------------------------------------------");

const captchaToken = `03AFcWeA5wnHkx0_oF5L1PNwf5dv6Lx2ke04_Fl9uU_82kCmCF0Xt-kPoGhnb0xB61vxPGc1AQAcHZbR82SQIZ017MKehM1IJjYRn7crASXaO2nT0DhCoO9gGQvPPHYx5eyrBPZAZ0wXjnMDLZuMSD29qmm9Ercte8NNvWYDvBfrCSG7s43JVgCHm6iun4j5f2WfyweAQopeBgNQd2_PG8tTbbXK25pu6cOZXMSC1EcnkuiAvGoBFg_WO6KIMMt8QCMyxisvVrtX7gM1BdJ2iisRoFVoYOKeeygkkRtB10xQAuYHU05IF3w6p-viROhN3VfiNeTew0vNT8mir8IxRyfN7o4qmiDrRkwqfryysBnOUKrpjF1-xlxnHQAT2M5nsm0oXPdgHhZX4eW0dnW5MtTffWueyvW1igSsNyzD58PPP9T66eINbSxVEM5wdPOymfYQmR4j2AyjMyY_SuVs-gNQ1slgRBj57mkw33EcmUWN6NuL4mVUYHluVW8XnB4fapzlnmmjTaxqpkAha4bMw4TDngZK7bnMkV9o8oAHACgW9BzJyxsmgto-Ig7KvDtNL2aS2jlnHDD-eQNX9WUB-tT5CeQbDThBnos_hfR2og2rnJ33mNK-YKkwQbJasyYNvSE9Ulf1zGe3a_a9IWkukBJ4ce458LHL7h_7WqZ3HSb18zfaLQEs3IIFUglyt4m3EUFGEt8iRH4_ENohxnVUteYLHhQwGHztJPC7pAPLoaO5eSMqhwmuY25Lorn2QR06OLkz6D39pWqRodoqMcfaAk-AAtPXz0nm_oZZpuxzRYGCeXiHHw0pRJRWa1C3m8jUb26HQ4OaT3i35ETufUUZG6i57PTjFcDE2Yccn4dcwfkFjZkhINSC-ARCYT9JCK36E8EuPelGazo31Q8ud8KJu-Ep2ElFIZu9cnSnOGAZYnG7WU1r55f81YaGqIgOT64C8l2sZr_mIl9qcJ4B7-1kdyupCgNwp_ila5-4hnpfNKBR2Feic73nughM2RBgGFO-TQm0yDFA9VK2Ke1uSOzpbwFQKaP4A15DOgkVnYw7GxEG0-_rzS5Km1t0kPH7Ma7lEL47TGbQZwH5nmbVECpS3xZwupOBmKFuSgAEvgvalnSvYSiMrbmUPSq55ptYvkoYGJW0jt9Fo4_q0kDwusZiO5ow5ad-zlx1uAYpWyTBEjdnL9GA-CDSbnpi0eVVW8l-47ylKtGGFWQ0v5tgEKrjD2TJXr24uzo8M7X_xS9zcdQMKWifXVEDBlfKX6j44dxQP_-XYQl7AehN2PR9lfvWm7G26tDlvqRZKxR4QgeTC9MHLeANX-BmCspWK6KXY1xbvg0s_MLeSQa2SG1W0-22eA2LfTOGnranXY5YVuHBwxjMXd9HY92_JuvUKlEDtBe1L2K4xQB5O6CSudXpD8QO62x6iWGoDAiD_Hb4sb8WSkaPe4RuS1OwgSiRfAbYa9nT093QM2ZWKzvULnvSPFFmQmY7iYXaBqYYvoLWupDTnhedJtm0Rt8lE7D_9DW-Rh4o9fec0uCnbQGr-LebR3FNtsrpgHkOnV4ps6ETnlV3zp-rpuKoQvvQBSGDhZ2b2PqihGZdm5R_31fZooF-6vWYFb8e9sxpp3tvmWzQZi9L63WZ5rNvxgCz_B8WlTHaQDxlQxsLP33GZWNE_xR9PlSFMJJrAClaVuxzs6tryWnfhK0BRXjWNlgcHivGogOxfqPkZwOf85p4cR3JQjQfOBYpESCpIFNEHdNf3gQmi4NG5d6OUbER2KrnDf4kMX8nnUMmojyXjDs8aa4am0Uwxna0ETQVcvd-hi67kgp3NIwxoNJhVJDCKRGbzETAh9t3i4rkv0gJZ0J0LtSoT2nYv4bfD2r1PNoftB1PYYYvXT61IwQbRW0MUFgHFkQlNFQ5YvKhmATq_oDVDuJi5xPa3HzoThYvSnO40H7KZiD_c_OKCTZz23hLQtzs-FJGa-e92wiGUb3-_F9LdGEMnSKTGHLO1ydCOC5v1TLp7tIWjOsfkuZJNzC0nJRgG8BGwTQujQsR4VHgvLlk3LghImZW-GcM5NSsovZXlXnOEXOOTt8DfutHUz6Eaur5iguZQ`;

class FireverseMusicBot {
  constructor(token, accountIndex) {
    this.baseUrl = "https://api.fireverseai.com";
    this.token = token;
    this.accountIndex = accountIndex;
    this.playedSongs = new Set();
    this.dailyPlayCount = 0;
    this.DAILY_LIMIT = 50;
    this.lastHeartbeat = Date.now();
    this.totalListeningTime = 0;
    this.headers = {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.8",
      "content-type": "application/json",
      origin: "https://app.fireverseai.com",
      referer: "https://app.fireverseai.com/",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      "x-version": "1.0.100",
      "sec-ch-ua": '"Not(A:Brand";v="99", "Brave";v="133", "Chromium";v="133"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1",
      token: token,
      Invitationcode: "SML4KA",
    };
  }

  log(message, overwrite = false) {
    const prefix = `[Account ${this.accountIndex}] `;
    if (overwrite) {
      process.stdout.write(`\r${prefix}${message}`);
    } else {
      console.log(`${prefix}${message}`);
    }
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  async initialize() {
    try {
      await this.getUserInfo();
      await this.getDailyTasks();
      return true;
    } catch (error) {
      this.log("❌ Error initializing bot: " + error.message);
      return false;
    }
  }

  async getUserInfo() {
    try {
      const response = await axios.get(`${this.baseUrl}/userInfo/getMyInfo`, {
        headers: this.headers,
      });
      const { level, expValue, score, nextLevelExpValue } = response.data.data;
      this.log("\n📊 Trạng thái:");
      this.log(
        `Level: ${level} | EXP: ${expValue}/${nextLevelExpValue} | Score: ${score}`
      );
      this.log(
        `Tổng thời gian nghe: ${Math.floor(
          this.totalListeningTime / 60
        )} phút\n`
      );
    } catch (error) {
      this.log("❌ Error getting user info: " + error.message);
    }
  }

  async getDailyTasks() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/musicTask/getListByCategory?taskCategory=1`,
        { headers: this.headers }
      );

      if (response.data?.data && Array.isArray(response.data.data)) {
        this.log("\n📋 Daily Tasks:");
        response.data.data.forEach((task) => {
          if (task && task.name) {
            let progress;
            if (task.taskKey === "play_music" && task.unit === "minutes") {
              progress = `${Math.floor(this.totalListeningTime / 60)}/${
                task.completeNum
              }`;
            } else {
              progress =
                task.itemCount ||
                `${task.completedRounds || 0}/${
                  task.maxCompleteLimit || task.completeNum || 0
                }`;
            }
            this.log(
              `- ${task.name}: ${progress} (${task.rewardScore} points)`
            );
          }
        });
        this.log("");
      }
    } catch (error) {
      this.log("❌ Error getting daily tasks: " + error.message);
    }
  }

  async getRecommendedSongs() {
    try {
      const response = await axios.post(
        `${this.baseUrl}/home/getRecommend`,
        { type: 1 },
        { headers: this.headers }
      );
      return response.data?.data || [];
    } catch (error) {
      this.log("❌ Error getting recommended songs: " + error.message);
      return [];
    }
  }

  async addToHistory(musicId) {
    try {
      await axios.post(
        `${this.baseUrl}/musicHistory/addToHistory/${musicId}`,
        {},
        { headers: this.headers }
      );
    } catch (error) {
      this.log("❌ Error adding to history: " + error.message);
    }
  }

  async getMusicDetails(musicId) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/music/getDetailById?musicId=${musicId}`,
        { headers: this.headers }
      );
      return response.data?.data;
    } catch (error) {
      this.log("❌ Error getting music details: " + error.message);
      return null;
    }
  }

  async sendHeartbeat() {
    try {
      const now = Date.now();
      if (now - this.lastHeartbeat >= 30000) {
        await axios.post(
          `${this.baseUrl}/music/userOnlineTime/receiveHeartbeat`,
          {},
          { headers: this.headers }
        );
        this.lastHeartbeat = now;
        process.stdout.write("💓");
      }
    } catch (error) {
      // Silent heartbeat errors
    }
  }

  async playMusic(musicId) {
    try {
      await axios.post(
        `${this.baseUrl}/musicUserBehavior/playEvent`,
        { musicId, event: "playing" },
        { headers: this.headers }
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async endMusic(musicId) {
    try {
      await axios.post(
        `${this.baseUrl}/musicUserBehavior/playEvent`,
        { musicId, event: "playEnd" },
        { headers: this.headers }
      );
      return true;
    } catch (error) {
      this.log("❌ Error ending music: " + error.message);
      return false;
    }
  }

  async likeMusic(musicId) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/musicMyFavorite/addToMyFavorite?musicId=${musicId}`,
        {},
        { headers: this.headers }
      );
      return response.data?.success || false;
    } catch (error) {
      this.log("❌ Error liking music: " + error.message);
      return false;
    }
  }

  async commentMusic(musicId, content = "good one") {
    try {
      const commentData = {
        content,
        musicId,
        parentId: 0,
        rootId: 0,
      };

      const response = await axios.post(
        `${this.baseUrl}/musicComment/addComment`,
        commentData,
        { headers: this.headers }
      );
      return response.data?.success || false;
    } catch (error) {
      this.log("❌ Error commenting on music: " + error.message);
      return false;
    }
  }

  async playSession() {
    try {
      if (this.dailyPlayCount >= this.DAILY_LIMIT) {
        this.log(
          `\n🎵 Daily limit reached (${this.DAILY_LIMIT}/${this.DAILY_LIMIT}). Waiting for reset...`
        );
        return false;
      }

      const songs = await this.getRecommendedSongs();
      if (!songs || songs.length === 0) {
        this.log("\n❌ No songs available, retrying in 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        return true;
      }

      for (const song of songs) {
        if (this.playedSongs.has(song.id)) continue;

        this.playedSongs.add(song.id);
        this.dailyPlayCount++;

        const musicDetails = (await this.getMusicDetails(song.id)) || {};
        const duration = musicDetails.duration || song.duration || 180;

        await this.addToHistory(song.id);

        const songName =
          song.musicName || musicDetails.musicName || "Unknown Song";
        const author = song.author || musicDetails.author || "Unknown Artist";

        this.log("\n▶️  Now Playing:");
        this.log(`🎵 Chủ đề: ${songName}`);
        this.log(`👤 Nghệ sĩ: ${author}`);
        this.log(`🆔 Music ID: ${song.id}`);
        this.log(
          `📊 Tiến trình: ${this.dailyPlayCount}/${this.DAILY_LIMIT} songs today`
        );
        this.log(`⏱️  Duration: ${this.formatTime(duration)}`);

        const likeSuccess = await this.likeMusic(song.id);
        this.log(
          `${likeSuccess ? "❤️" : "💔"} Like status: ${
            likeSuccess ? "Success" : "Failed"
          }`
        );

        const commentSuccess = await this.commentMusic(song.id);
        this.log(`💬 Comment status: ${commentSuccess ? "Success" : "Failed"}`);

        if (await this.playMusic(song.id)) {
          let secondsPlayed = 0;

          for (let timeLeft = duration; timeLeft > 0; timeLeft--) {
            await this.sendHeartbeat();
            secondsPlayed++;
            this.totalListeningTime++;

            this.log(
              `⏳ Thời gian nghe còn lại: ${this.formatTime(
                timeLeft
              )} | Thời gian nghe: ${Math.floor(
                this.totalListeningTime / 60
              )} phút`,
              true
            );
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }

          const endSuccess = await this.endMusic(song.id);

          if (endSuccess) {
            this.log("\n✅ Finished playing");
          } else {
            this.log("\n⚠️ Song ended but playEnd event failed");
          }

          await this.getUserInfo();
          await this.getDailyTasks();
          break;
        } else {
          this.log("\n❌ Failed to play song");
        }
      }

      return true;
    } catch (error) {
      this.log("❌ Error in play session: " + error.message);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      return true;
    }
  }

  async startDailyLoop() {
    let i = 100
    while (i > 0) {
      const shouldContinue = await this.playSession();
      if (!shouldContinue) {
        this.dailyPlayCount = 0;
        this.playedSongs.clear();
        this.totalListeningTime = 0;
        this.log("\n🔄 Starting new daily session");
        await this.getUserInfo();
        await this.getDailyTasks();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
      i--
    }
  }
}

const getNonce = async (walletAddress, retries = 3) => {
  try {
    const res = await axios.get(
      `https://api.fireverseai.com/oauth/metamask/getNonce?publicAddress=${walletAddress}&captchaToken=${captchaToken}`
    );
    return res.data.data.nonce;
  } catch (error) {
    if (retries > 0) {
      console.log("Lỗi get nonce:", error.message);
      console.log(`Đang thử lại... (Còn ${retries - 1} lần thử lại)`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return await getNonce(walletAddress, retries - 1);
    } else {
      console.log("Lỗi get nonce sau nhiều lần thử:", error.message);
      return null;
    }
  }
};

async function signMessage(nonce, privateKey) {
  const message = `I am signing my one-time nonce: ${nonce}`;
  const wallet = new ethers.Wallet(privateKey);
  try {
    const signature = await wallet.signMessage(message);
    return signature;
  } catch (error) {
    console.log("Lỗi signing message:", error);
    return null;
  }
}

async function login(signature, publicAddress) {
  try {
    const res = await axios.post(
      `https://api.fireverseai.com/oauth/metamask/auth`,
      { signature, publicAddress }
    );
    return res.data.data.token;
  } catch (error) {
    console.log("Lỗi login", error.message);
  }
}

async function readTokens() {
  try {
    const content = await fs.readFile("wallets.txt", "utf-8");
    const wallets = content
      .trim()
      .split("\n")
      ?.map((line) => line.trim());
    const tokens = [];
    console.log("Thực hiện đăng nhập để lấy token");
    let i = 0;
    for (const wallet of wallets) {
      let [address, privateKey] = wallet.split(",");
      address = address.toLowerCase();
      const nonce = await getNonce(address);
      const signature = await signMessage(nonce, privateKey);
      const token = await login(signature, address);
      if (token) tokens.push(token);
      console.log("Đang thực hiện lấy token acc", i + 1);
      i++;
    }
    return tokens;
  } catch (error) {
    console.error("❌ Error reading tokens.txt:", error.message);
    process.exit(1);
  }
}

async function main() {
  while (true) {
    const tokens = await readTokens();
    const time = (new Date()).getTime();

    if (tokens.length === 0) {
      console.error("❌ No tokens found in tokens.txt");
      process.exit(1);
    }

    console.log(`📱 Found ${tokens.length} account(s)`);

    const bots = tokens.map(
      (token, index) => new FireverseMusicBot(token, index + 1)
    );

    const initResults = await Promise.all(bots.map((bot) => bot.initialize()));

    const activeBots = bots.filter((_, index) => initResults[index]);

    if (activeBots.length === 0) {
      console.error("❌ No accounts could be initialized successfully");
      process.exit(1);
    }

    await Promise.all(activeBots.map((bot) => bot.startDailyLoop()));
    console.log("Chờ 1 ngày để tiếp tục");
    const endtime = (new Date()).getTime();
    const delay = time + 7200000 - endtime;
    await new Promise(resolve => setTimeout(resolve, delay));
    
  }
}

main().catch(console.error);

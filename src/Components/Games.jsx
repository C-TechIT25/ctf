import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  TextField,
  Alert,
  CircularProgress,
  AppBar,
  Toolbar,
  Fab,
  Avatar,
  Badge,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import Lemon from "../assets/Lemon.png";
import StrawGame from "../assets/Straw.png";
import Act from "../assets/Act.png";
import Quiz from "../assets/Quiz.png";
import Target from "../assets/Target.png";
import Hidden from "../assets/Hidden.png";
import Basket from "../assets/Basket.png";
import Baloon from "../assets/Baloon.png";
import Banner from "../assets/Banner.png";
import Banner1 from "../assets/Banner1.png";
import Banner2 from "../assets/Banner2.png";
import Banner3 from "../assets/Banner3.png";
import { useNavigate } from "react-router-dom";

// Game data
const cardData = [
  {
    image: Lemon,
    title: "Lemon balance race",
    desc: "Be the first to complete the race while balancing a lemon on a spoon",
    rules: [
      "Each player receives a spoon and a lemon",
      "Players must hold the spoon in their mouth, balancing the lemon",
      "If the lemon falls down at any point, the participant is eliminated",
      "The first two players to cross the finish line without dropping the lemon are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: StrawGame,
    title: "Straw Juice",
    desc: "Be the first to finish drinking a glass of juice using only a straw",
    rules: [
      "Each player receives a glass of juice and a straw",
      "Players must drink the juice as quickly as possible using only the straw",
      "No hands are allowed to touch the glass or straw during drinking",
      "The first two to finish their juice completely are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: Act,
    title: "Act & guess",
    desc: "Guess the word or phrase being acted out by your teammate",
    rules: [
      "Two bowls: Bowl 1 (player names), Bowl 2 (words)",
      "Two slips are drawn from Bowl 1 → one is the teller, one the guesser",
      "The teller picks a word from Bowl 2 and acts it out silently",
      "The guesser must identify the word - if correct, the guesser scores points",
      "Top two players with the most points are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: Quiz,
    title: "Quiz",
    desc: "Answer quiz questions correctly to earn points",
    rules: [
      "The game is played in rounds of 5 participants",
      "Each question has 3 options (A, B, C)",
      "Players must stand in the column (A, B, or C) they believe is correct",
      "Correct answers earn points; wrong answers = no points",
      "After all rounds, the two highest scorers are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: Target,
    title: "Target Loss",
    desc: "Score the most points by throwing magnetic darts at the target",
    rules: [
      "Players take turns throwing magnetic darts at the dartboard",
      "Points are awarded based on where the dart lands",
      "Players must stand behind the throwing line",
      "After all rounds, the top two scorers are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: Hidden,
    title: "Hidden match",
    desc: "Match the colors of balloons to score points",
    rules: [
      "Balloons of different colors are placed inside a covered box",
      "Players take turns picking a balloon and trying to match its color",
      "If the colors match → the player scores points",
      "The game continues until all balloons are tried",
      "The two players with the highest points are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: Basket,
    title: "Basket ball",
    desc: "Score the most points by shooting a mini basketball into a hoop",
    rules: [
      "Each player gets 3 chances to shoot the ball into the basket",
      "Every successful shot = 1 point",
      "Players must shoot from behind the designated line",
      "The top two players with the highest points are winners",
    ],
    winners: "1st and 2nd place winners",
  },
  {
    image: Baloon,
    title: "Balloon blast",
    desc: "Be the last player with an unpopped balloon attached to their ankle",
    rules: [
      "Each player receives 4–6 balloons",
      "Balloons are inflated by mouth (no pumps/oxygen cylinders)",
      "Players must burst the balloons without using hands or objects",
      "Top 2 winners are decided by the most balloons burst",
    ],
    winners: "Top 2 winners by balloons burst",
  },
];

// Winner List Data (matching the PDF structure)
const winnerListData = [
  {
    game: "Lemon Balance Race",
    winners: ["", ""],
  },
  {
    game: "Straw Juice",
    winners: ["", ""],
  },
  {
    game: "Act & Guess",
    winners: ["", ""],
  },
  {
    game: "Quiz",
    winners: ["", ""],
  },
  {
    game: "Target Loss",
    winners: ["", ""],
  },
  {
    game: "Hiddne Match",
    winners: ["", ""],
  },
  {
    game: "Basket Ball",
    winners: ["", ""],
  },
  {
    game: "Balloon Blast",
    winners: ["", ""],
  },
];

// Admin Login Dialog Component
function AdminLoginDialog({ open, onClose, onLoginSuccess }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setError("");

    // Simulate login process
    setTimeout(() => {
      if (username === "irbaz" && password === "262181") {
        onLoginSuccess();
        onClose();
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="admin-login-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
          maxWidth: "400px",
          width: "100%",
          fontFamily: '"Poppins", sans-serif',
        },
      }}
    >
      <DialogTitle
        id="admin-login-dialog-title"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Typography variant="h6" component="span" fontFamily="inherit">
          Admin Login
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, fontFamily: "inherit" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
          variant="outlined"
          sx={{ fontFamily: "inherit" }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          margin="normal"
          required
          variant="outlined"
          sx={{ fontFamily: "inherit" }}
        />
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            fontFamily: "inherit",
            mr: 1,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleLogin}
          variant="contained"
          disabled={loading}
          sx={{
            borderRadius: 2,
            fontFamily: "inherit",
            minWidth: 100,
            textTransform: "none",
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Winner List Dialog Component
function WinnerListDialog({ open, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="winner-list-dialog-title"
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
          width: "100%",
          fontFamily: '"Poppins", sans-serif',
          maxHeight: fullScreen ? "100%" : "90vh",
        },
      }}
    >
      <DialogTitle
        id="winner-list-dialog-title"
        sx={{
          m: 0,
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmojiEventsIcon
            sx={{ mr: 1, fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          />
          <Typography
            variant="h6"
            component="span"
            fontFamily="inherit"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            Winner List
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "white", p: { xs: 0.5, sm: 1 } }}
        >
          <CloseIcon sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }} />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{ p: 0, fontFamily: "inherit", overflow: "auto" }}
      >
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            fontWeight="bold"
            fontFamily="'Keania One', sans-serif"
            color="primary.main"
            gutterBottom
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
          >
            C-TECH FIESTA
          </Typography>
          <Typography
            variant="h6"
            color="primary.main"
            fontFamily="inherit"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            Winner List
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            maxHeight: fullScreen ? "calc(100vh - 200px)" : "400px",
            overflow: "auto",
          }}
        >
          <Table
            sx={{ minWidth: 300 }}
            aria-label="winner list"
            size={isMobile ? "small" : "medium"}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    width: "10%",
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontFamily: "inherit",
                  }}
                >
                  S.No
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    width: "30%",
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontFamily: "inherit",
                  }}
                >
                  Game
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    width: "60%",
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    fontFamily: "inherit",
                  }}
                >
                  Participant Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {winnerListData.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        verticalAlign: "top",
                        fontWeight: "bold",
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        fontFamily: "inherit",
                      }}
                    >
                      {index + 1}.
                    </TableCell>
                    <TableCell
                      rowSpan={2}
                      sx={{
                        verticalAlign: "top",
                        py: { xs: 1, sm: 1.5 },
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                        fontFamily: "inherit",
                      }}
                    >
                      {row.game}
                    </TableCell>
                    <TableCell sx={{ py: { xs: 0.5, sm: 1 } }}>
                      <TextField
                        fullWidth
                        placeholder="Participant Name"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            py: { xs: 0.5, sm: 0.75 },
                            fontFamily: "inherit",
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ py: { xs: 0.5, sm: 1 } }}>
                      <TextField
                        fullWidth
                        placeholder="Participant Name"
                        size="small"
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: { xs: "0.75rem", sm: "0.9rem" },
                            py: { xs: 0.5, sm: 0.75 },
                          },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 1, sm: 2 } }}>
        <Button
          autoFocus
          onClick={onClose}
          variant="contained"
          fullWidth={fullScreen}
          size={isMobile ? "small" : "medium"}
          sx={{
            mx: fullScreen ? 1 : 0,
            borderRadius: 2,
            fontFamily: "inherit",
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Chat Dialog Component
function ChatDialog({ open, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm the C-Tech Fiesta assistant. How can I help you?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage = {
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    // Process message and generate response
    let responseText = "";
    const text = inputText.toLowerCase();

    // Check for game-specific queries
    const gameQueries = cardData.map((game) => ({
      name: game.title.toLowerCase(),
      keywords: game.title.toLowerCase().split(" "),
      game: game,
    }));

    let matchedGame = null;
    let isRuleQuery = text.includes("rule") || text.includes("how to play");

    // Check if user is asking about a specific game
    for (const gameQuery of gameQueries) {
      if (
        gameQuery.keywords.some((keyword) => text.includes(keyword)) ||
        text.includes(gameQuery.name)
      ) {
        matchedGame = gameQuery.game;
        break;
      }
    }

    if (matchedGame) {
      if (isRuleQuery) {
        // Show rules for the specific game
        responseText = `Rules for ${matchedGame.title}:\n\n${matchedGame.rules
          .map((rule, index) => `${index + 1}. ${rule}`)
          .join("\n")}\n\n${matchedGame.winners}`;
      } else {
        // Show general info about the game
        responseText = `${matchedGame.title}: ${matchedGame.desc}. You can ask about the rules by saying "What are the rules for ${matchedGame.title}?"`;
      }
    } else if (
      text.includes("list games") ||
      text.includes("what games") ||
      text.includes("available games")
    ) {
      // List all available games with proper formatting
      responseText =
        "Available games:\n\n" +
        cardData
          .map((game, index) => `${index + 1}. ${game.title} - ${game.desc}`)
          .join("\n\n") +
        "\n\nYou can ask about specific games by name or ask about their rules.";
    } else if (
      text.includes("event") ||
      text.includes("when") ||
      text.includes("date")
    ) {
      responseText =
        "The event is on 20th of this month (Saturday) from 10 AM to 6 PM.";
    } else if (
      text.includes("company") ||
      text.includes("about") ||
      text.includes("c-tech")
    ) {
      responseText =
        "Hello from C-Tech Engineering Company! We specialize in innovative engineering solutions and have been in the industry for over 15 years.";
    } else if (
      text.includes("hi") ||
      text.includes("hello") ||
      text.includes("hey")
    ) {
      responseText =
        "Hello! Welcome to C-Tech Fiesta. How can I assist you today? You can ask about games, event details, or company information.";
    } else if (text.includes("game") || text.includes("register")) {
      responseText =
        "You can register for any game by clicking the 'Register Now' button on the game card. Each participant can register for up to 3 games. To see available games, ask 'What games are available?'";
    } else if (text.includes("location") || text.includes("where")) {
      responseText =
        "The event will be held at the C-Tech Engineering Campus, Building A, Ground Floor.";
    } else if (text.includes("limit") || text.includes("how many")) {
      responseText =
        "Each participant can register for a maximum of 3 games. This ensures everyone gets a chance to participate in multiple activities.";
    } else {
      responseText =
        "I'm sorry, I didn't understand that. You can ask me about: \n- Available games\n- Game rules (e.g., 'Quiz game rules')\n- Event date and location\n- Registration information\n- Company details";
    }

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInputText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="chat-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
          width: fullScreen ? "100%" : "400px",
          height: fullScreen ? "100%" : "500px",
          maxWidth: "none",
          fontFamily: '"Poppins", sans-serif',
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle
        id="chat-dialog-title"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: 1.5,
              bgcolor: "white",
              color: "primary.main",
            }}
          >
            C
          </Avatar>
          <Typography variant="h6" component="span" fontFamily="inherit">
            C-Tech Assistant
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ flexGrow: 1, p: 2, overflow: "auto" }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.sender === "user" ? "flex-end" : "flex-start",
              mb: 2,
            }}
          >
            <Paper
              sx={{
                p: 1.5,
                maxWidth: "70%",
                backgroundColor:
                  message.sender === "user" ? "primary.main" : "grey.100",
                color: message.sender === "user" ? "white" : "text.primary",
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" fontFamily="inherit">
                {message.text}
              </Typography>
              <Typography
                variant="caption"
                display="block"
                textAlign="right"
                sx={{ opacity: 0.7, mt: 0.5 }}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Paper>
          </Box>
        ))}
      </DialogContent>

      <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mr: 1 }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={inputText.trim() === ""}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Dialog>
  );
}

// Rules Dialog Component
function RulesDialog({ open, onClose, game }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="rules-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
          maxWidth: "600px",
          width: "100%",
          fontFamily: '"Poppins", sans-serif',
        },
      }}
    >
      <DialogTitle
        id="rules-dialog-title"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ fontSize: 30, mr: 1.5 }}>{game?.emoji}</Box>
          <Typography variant="h6" component="span" fontFamily="inherit">
            {game?.title} rules
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, fontFamily: "inherit" }}>
        <Box sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic" }}
            fontFamily="inherit"
          >
            {game?.desc}
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              color: "primary.main",
              mb: 2,
            }}
            fontFamily="inherit"
          >
            <SportsEsportsIcon sx={{ mr: 1, color: "primary.main" }} />
            How to play
          </Typography>
          <List sx={{ mt: { xs: -2, sm: 1 } }}>
            {game?.rules.map((rule, index) => (
              <ListItem key={index} sx={{ py: 1 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      backgroundColor: "primary.main",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={rule}
                  primaryTypographyProps={{
                    fontFamily: "inherit",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        <Box sx={{ p: 2, backgroundColor: "#0d7bd4ff" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            fontFamily="inherit"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" }, color: "white" }}
          >
            Winners: {game?.winners}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button
          autoFocus
          onClick={onClose}
          variant="contained"
          fullWidth={fullScreen}
          sx={{
            mx: fullScreen ? 2 : 0,
            borderRadius: 2,
            fontFamily: "inherit",
          }}
        >
          Got it!
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Registration Dialog Component
function RegisterDialog({ open, onClose, game }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    phone: "",
    game: game?.title || "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const checkRegistrationLimit = async (phone) => {
    try {
      const q = query(
        collection(db, "registrations"),
        where("phone", "==", phone)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (err) {
      console.error("Error checking registration limit: ", err);
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate phone number
    if (!formData.phone || formData.phone.length < 10) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      // Check if user has already registered for 3 games
      const registrationCount = await checkRegistrationLimit(formData.phone);

      if (registrationCount >= 3) {
        setError(
          "You have already registered for 3 games. Each participant can only register for 3 games."
        );
        setLoading(false);
        return;
      }

      // Check if user has already registered for this specific game
      const gameCheckQuery = query(
        collection(db, "registrations"),
        where("phone", "==", formData.phone),
        where("game", "==", game.title)
      );
      const gameCheckSnapshot = await getDocs(gameCheckQuery);

      if (!gameCheckSnapshot.empty) {
        setError("You have already registered for this game.");
        setLoading(false);
        return;
      }

      // Add registration to Firestore
      await addDoc(collection(db, "registrations"), {
        ...formData,
        game: game?.title || "",
        timestamp: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          name: "",
          designation: "",
          phone: "",
          game: game?.title || "",
        });
      }, 2000);
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error("Error adding document: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="register-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 2,
          maxWidth: "500px",
          width: "100%",
          fontFamily: '"Poppins", sans-serif',
        },
      }}
    >
      <DialogTitle
        id="register-dialog-title"
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "primary.main",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ fontSize: 30, mr: 1.5 }}>{game?.emoji}</Box>
          <Typography
            variant="h6"
            component="span"
            fontFamily="inherit"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            Register for {game?.title}
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ color: "white" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 3, fontFamily: "inherit" }}>
        {success ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! We'll see you at the event.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ fontFamily: "inherit" }}
            />

            <TextField
              fullWidth
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ fontFamily: "inherit" }}
            />

            <TextField
              fullWidth
              label="Phone number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
              variant="outlined"
              sx={{ fontFamily: "inherit" }}
              helperText="We'll use this to check your registration limit (max 3 games per person)"
            />

            <input type="hidden" name="game" value={formData.game} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        {!success && (
          <>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                borderRadius: 2,
                fontFamily: "inherit",
                mr: 1,
                textTransform: "none",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={loading}
              sx={{
                borderRadius: 2,
                fontFamily: "inherit",
                minWidth: 100,
                textTransform: "none",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}

// Main Component
export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [rulesDialogOpen, setRulesDialogOpen] = useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [adminLoginDialogOpen, setAdminLoginDialogOpen] = useState(false);
  const [winnerListDialogOpen, setWinnerListDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleRulesClick = (game) => {
    setSelectedGame(game);
    setRulesDialogOpen(true);
  };

  const handleRegisterClick = (game) => {
    setSelectedGame(game);
    setRegisterDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setRulesDialogOpen(false);
    setRegisterDialogOpen(false);
    setChatDialogOpen(false);
    setAdminLoginDialogOpen(false);
    setWinnerListDialogOpen(false);
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    navigate("/admin");
  };

  const handleAdminButtonClick = () => {
    setAdminLoginDialogOpen(true);
  };

  const handleWinnerListClick = () => {
    setWinnerListDialogOpen(true);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "white", color: "text.primary", py: 1 }}
      >
        <Toolbar sx={{ minHeight: { xs: "48px", sm: "64px" } }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="700"
            sx={{
              flexGrow: 1,
              color: "#1976d2",
              fontFamily: "Poppins, sans-serif",
              userSelect: "none",
              fontSize: { xs: "0.7rem", sm: "1.8rem", md: "2.5rem" },
              lineHeight: { xs: "1.2", sm: "1.5" },
            }}
          >
            C-Tech Engineering 
            <span style={{ color: "#1976d2", fontFamily: "Keania One" }}>
              
            </span>
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: { xs: 0.5, sm: 1 },
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleWinnerListClick}
              sx={{
                borderRadius: 2,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.55rem", sm: "0.7rem", md: "0.875rem" },
                padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" },
                minWidth: { xs: "auto", sm: "64px" },
                whiteSpace: "nowrap",
              }}
            >
              Results
            </Button>
            <Button
              variant="outlined"
              onClick={handleAdminButtonClick}
              sx={{
                borderRadius: 2,
                fontFamily: "'Poppins', sans-serif",
                fontSize: { xs: "0.55rem", sm: "0.7rem", md: "0.875rem" },
                padding: { xs: "4px 8px", sm: "6px 12px", md: "8px 16px" },
                minWidth: { xs: "auto", sm: "64px" },
                whiteSpace: "nowrap",
              }}
            >
              Admin
            </Button>
          </Box>
        </Toolbar>
      </AppBar>


<Box
  sx={{
    width: { xs: "95%", sm: "90%", md: "70%" }, // shrink smoothly
    margin: "auto",
    mt: { xs: 2, sm: 4, md:7 },
    mb: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // boxShadow: "0 14px 20px rgba(0, 0, 0, 1)",
    borderRadius: 2,
    userSelect: "none",
    
  }}
>
  <img
    src={Banner3}
    alt="Banner"
    style={{
      width: "100%",
      height: "auto", // let height adjust automatically
      maxHeight: "70vh", // keep tall screens in check
      objectFit: "cover", // crop nicely instead of stretching
      borderRadius: "8px",
    }}
  />
</Box>


      <Box
        sx={{
          background: "linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)",
          py: 5,
          display: "flex",
          justifyContent: "center",
          minHeight: "80vh",
          fontFamily: '"Poppins", sans-serif',
          userSelect: "none",
        }}
      >
        <Box sx={{ px: { xs: 1, sm: 3, md: 4 }, width: "100%" }}>
          <Typography
            variant="h1"
            component="h2"
            textAlign="center"
            fontWeight="600"
            mb={1}
            fontFamily="inherit"
            color="primary.main"
            sx={{
              fontFamily: "Bitcount Grid Double",
              fontSize: { xs: "1.5rem", sm: "2.5rem", md: "5rem" },
            }}
          >
            Game Registration
          </Typography>

          <Typography
            variant="h5"
            textAlign="center"
            mb={8}
            mt={2}
            fontFamily="inherit"
            sx={{
              maxWidth: 800,
              mx: "auto",
              color: "#e2b900ff",
              fontWeight: "600",
              fontFamily: "Inter",
              fontSize: { xs: ".7rem", sm: "1.25rem", md: "1.5rem" },
              px: { xs: 1, sm: 2 },
            }}
          >
            Register for your favorite games and join the fun! Each participant
            can register for up to 3 games.
          </Typography>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: { xs: -5, sm: 2 } }}
          >
            {cardData.map((game) => (
              <Grid key={game.title} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  tabIndex={0}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    minWidth: { xs: "100%", sm: 400 },
                    maxWidth: { xs: "100%", sm: 400 },
                    border: "4px dashed #fdd520ff",
                    borderRadius: 3,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid",
                      outlineColor: "primary.main",
                      outlineOffset: "2px",
                    },
                  }}
                >
                  {/* Title section with background color */}
                  <Box
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      py: 1.5,
                      px: 3,
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={600}
                      fontFamily="inherit"
                      sx={{
                        textTransform: "none",
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      {game.title}
                    </Typography>
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: { xs: 2, sm: 3 },
                      textAlign: "center",
                      background:
                        "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                    }}
                  >
                    <Box
                      component="img"
                      src={game.image}
                      alt={game.title}
                      sx={{
                        width: { xs: 80, sm: 100 }, // adjust size as needed
                        height: "auto",
                        mb: 2,
                        transition: "transform 0.3s ease",
                        mixBlendMode: "darken",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      lineHeight={1.6}
                      sx={{ mb: 2 }}
                      fontFamily="inherit"
                      fontSize={{ xs: "0.875rem", sm: "1rem" }}
                    >
                      {game.desc}
                    </Typography>

                    <Chip
                      label={game.winners}
                      size="small"
                      color="success"
                      variant="outlined"
                      sx={{
                        borderRadius: 1,
                        fontFamily: "inherit",
                        fontWeight: 500,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    />
                  </CardContent>

                  <CardActions
                    sx={{
                      pb: 2,
                      px: { xs: 1, sm: 3 },
                      bgcolor: "#f8f9fa",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: { xs: 1, sm: 0 },
                    }}
                  >
                    <Button
                      fullWidth={isMobile}
                      size="small"
                      variant="outlined"
                      onClick={() => handleRulesClick(game)}
                      sx={{
                        mr: { sm: 1 },
                        borderRadius: 2,
                        fontFamily: "inherit",
                        textTransform: "none",
                        fontWeight: 500,
                        py: 1,
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      view rules
                    </Button>
                    <Button
                      fullWidth={isMobile}
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => handleRegisterClick(game)}
                      sx={{
                        borderRadius: 2,
                        fontFamily: "inherit",
                        textTransform: "none",
                        fontWeight: 500,
                        py: 1,
                        boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                        fontSize: { xs: "0.75rem", sm: "0.875rem" },
                      }}
                    >
                      register now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 3,
          textAlign: "center",
        }}
      >
        <Typography
          fontFamily="'Inter', sans-serif"
          fontSize={{ xs: "0.875rem", sm: "1rem" }}
        >
          © 2025 C-Tech Fiesta •{" "}
          <strong>Designed & Developed by C-Tech IT Department</strong>
        </Typography>
      </Box>

      {/* Floating Chat Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1000,
        }}
        onClick={() => setChatDialogOpen(true)}
      >
        <Badge color="error" variant="dot">
          <ChatIcon />
        </Badge>
      </Fab>

      <RulesDialog
        open={rulesDialogOpen}
        onClose={handleCloseDialog}
        game={selectedGame}
      />

      <RegisterDialog
        open={registerDialogOpen}
        onClose={handleCloseDialog}
        game={selectedGame}
      />

      <ChatDialog
        open={chatDialogOpen}
        onClose={() => setChatDialogOpen(false)}
      />

      <AdminLoginDialog
        open={adminLoginDialogOpen}
        onClose={handleCloseDialog}
        onLoginSuccess={handleAdminLogin}
      />

      <WinnerListDialog
        open={winnerListDialogOpen}
        onClose={handleCloseDialog}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `}
      </style>
    </>
  );
}

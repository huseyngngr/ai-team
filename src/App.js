import React, { useState, useEffect } from 'react';

const GamePartyHub = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [parties, setParties] = useState([
    {
      id: 1,
      title: 'FIFA 24 Turnuvası',
      candidateGames: ['FIFA 24', 'NBA 2K24'],
      votes: { 'FIFA 24': { count: 3, voters: ['Ali', 'Mehmet', 'Ayşe'] }, 'NBA 2K24': { count: 1, voters: ['Can'] } },
      game: 'FIFA 24',
      host: 'Ali',
      date: '2024-01-15',
      time: '20:00-22:00',
      slots: [{ id: 1, time: '20:00-22:00', votes: { yes: 4, no: 0 }, voters: ['Ali', 'Mehmet', 'Ayşe', 'Can'] }],
      participants: ['Ali', 'Mehmet', 'Ayşe', 'Can'],
      maxPlayers: 4,
      status: 'upcoming',
      scores: null
    },
    {
      id: 2,
      title: 'PUBG Squad Battle',
      candidateGames: ['PUBG', 'Call of Duty', 'Fortnite'],
      votes: { 'PUBG': { count: 2, voters: ['Mehmet', 'Ayşe'] }, 'Call of Duty': { count: 1, voters: ['Can'] }, 'Fortnite': { count: 0, voters: [] } },
      game: null,
      host: 'Mehmet',
      date: '2024-01-16',
      time: '',
      slots: [
        { id: 1, time: '19:00-21:00', votes: { yes: 2, no: 1 }, voters: ['Mehmet', 'Ayşe', 'Can'] },
        { id: 2, time: '21:00-23:00', votes: { yes: 1, no: 2 }, voters: ['Mehmet', 'Ayşe', 'Can'] }
      ],
      participants: ['Mehmet', 'Ayşe', 'Can'],
      maxPlayers: 4,
      status: 'voting',
      scores: null
    },
    {
      id: 3,
      title: 'Rocket League Championship',
      candidateGames: ['Rocket League', 'FIFA 24'],
      votes: { 'Rocket League': { count: 3, voters: ['Ayşe', 'Can', 'Deniz'] }, 'FIFA 24': { count: 1, voters: ['Ece'] } },
      game: 'Rocket League',
      host: 'Ayşe',
      date: '2024-01-14',
      time: '18:00-20:00',
      slots: [{ id: 1, time: '18:00-20:00', votes: { yes: 4, no: 0 }, voters: ['Ayşe', 'Can', 'Deniz', 'Ece'] }],
      participants: ['Ayşe', 'Can', 'Deniz', 'Ece'],
      maxPlayers: 4,
      status: 'completed',
      scores: [
        { player: 'Ayşe', score: 15, result: 'win', points: 3 },
        { player: 'Can', score: 12, result: 'draw', points: 1 },
        { player: 'Deniz', score: 10, result: 'lose', points: 0 },
        { player: 'Ece', score: 8, result: 'lose', points: 0 }
      ]
    }
  ]);
  const [showNewParty, setShowNewParty] = useState(false);
  const [showVoting, setShowVoting] = useState(null);
  const [showSummary, setShowSummary] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendRequests, setShowFriendRequests] = useState(false);
  const [activeTab, setActiveTab] = useState('parties');
  const [selectedParty, setSelectedParty] = useState(null);
  const [scoreData, setScoreData] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showGlobalChat, setShowGlobalChat] = useState(false);
  const [globalMessage, setGlobalMessage] = useState('');
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, from: 'Can', fromId: 'user_can_123', status: 'pending', time: '2 saat önce' },
    { id: 2, from: 'Deniz', fromId: 'user_deniz_456', status: 'pending', time: '5 saat önce' }
  ]);
  const [friends, setFriends] = useState([
    { id: 'user_ali_789', name: 'Ali', status: 'online', game: 'FIFA 24' },
    { id: 'user_mehmet_012', name: 'Mehmet', status: 'online', game: 'PUBG' },
    { id: 'user_ayse_345', name: 'Ayşe', status: 'online', game: 'NBA 2K24' }
  ]);
  
  const [userProfile] = useState({
    id: 'user_oyuncu123_001',
    username: 'Oyuncu123',
    rank: 'Altın III',
    totalGames: 47,
    wins: 28,
    losses: 19,
    winRate: 60,
    favoriteGame: 'FIFA 24',
    totalScore: 840,
    gameStats: [
      { game: 'FIFA 24', gamesPlayed: 18, wins: 12, winRate: 67, totalScore: 320 },
      { game: 'PUBG', gamesPlayed: 15, wins: 8, winRate: 53, totalScore: 280 },
      { game: 'NBA 2K24', gamesPlayed: 8, wins: 5, winRate: 63, totalScore: 150 },
      { game: 'Call of Duty', gamesPlayed: 4, wins: 2, winRate: 50, totalScore: 70 },
      { game: 'Rocket League', gamesPlayed: 2, wins: 1, winRate: 50, totalScore: 20 }
    ],
    recentGames: [
      { game: 'FIFA 24', result: 'win', score: 18, date: '2 saat önce' },
      { game: 'NBA 2K24', result: 'loss', score: 12, date: '5 saat önce' },
      { game: 'PUBG', result: 'win', score: 21, date: 'Dün' },
      { game: 'FIFA 24', result: 'win', score: 15, date: '2 gün önce' }
    ],
    onlineFriends: [
      { id: 'user_ali_789', name: 'Ali', game: 'FIFA 24', status: 'Maçta' },
      { id: 'user_mehmet_012', name: 'Mehmet', game: 'PUBG', status: 'Lobide' },
      { id: 'user_ayse_345', name: 'Ayşe', game: 'NBA 2K24', status: 'Maçta' }
    ]
  });

  // Initialize conversations from localStorage or default data
  const getInitialConversations = () => {
    const saved = localStorage.getItem('gamePartyHub_conversations');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: 'chat_ali',
        name: 'Ali',
        avatar: 'A',
        lastMessage: 'FIFA oynayacak var mı?',
        time: '10:30',
        unread: true,
        messages: [
          { id: 1, from: 'Ali', text: 'Selam! FIFA oynayacak var mı?', time: '10:30', isOwn: false },
          { id: 2, from: 'Oyuncu123', text: 'Merhaba! Ben varım, ne zaman?', time: '10:32', isOwn: true },
          { id: 3, from: 'Ali', text: 'Harika! 20:00de başlayalım mı?', time: '10:33', isOwn: false },
          { id: 4, from: 'Oyuncu123', text: 'Tamam, ben hazırım!', time: '10:35', isOwn: true }
        ]
      },
      {
        id: 'chat_mehmet',
        name: 'Mehmet',
        avatar: 'M',
        lastMessage: 'Ben varım! 20:00de başlayalım',
        time: '10:25',
        unread: true,
        messages: [
          { id: 1, from: 'Mehmet', text: 'PUBG squad battle yapalım mı?', time: '10:20', isOwn: false },
          { id: 2, from: 'Oyuncu123', text: 'Evet, ben varım!', time: '10:22', isOwn: true },
          { id: 3, from: 'Mehmet', text: 'Ben varım! 20:00de başlayalım', time: '10:25', isOwn: false }
        ]
      },
      {
        id: 'chat_ayse',
        name: 'Ayşe',
        avatar: 'A',
        lastMessage: 'Bende katılıyorum',
        time: '09:15',
        unread: false,
        messages: [
          { id: 1, from: 'Ayşe', text: 'NBA 2K24 turnuvası yapalım mı?', time: '09:10', isOwn: false },
          { id: 2, from: 'Oyuncu123', text: 'Harika fikir! Ben katılıyorum', time: '09:12', isOwn: true },
          { id: 3, from: 'Ayşe', text: 'Bende katılıyorum', time: '09:15', isOwn: false }
        ]
      }
    ];
  };

  const [conversations, setConversations] = useState(getInitialConversations);

  // Global chat data
  const getInitialGlobalChat = () => {
    const saved = localStorage.getItem('gamePartyHub_globalChat');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, from: 'Ali', text: 'Merhaba herkese! FIFA oynayacak var mı?', time: '10:30', isOwn: false },
      { id: 2, from: 'Mehmet', text: 'Ben varım! PUBG de oynayabiliriz', time: '10:32', isOwn: false },
      { id: 3, from: 'Ayşe', text: 'NBA 2K24 turnuvası yapalım mı?', time: '10:35', isOwn: false },
      { id: 4, from: 'Oyuncu123', text: 'Harika fikirler! Ben de katılıyorum', time: '10:37', isOwn: true }
    ];
  };

  const [globalChat, setGlobalChat] = useState(getInitialGlobalChat);

  const [newParty, setNewParty] = useState({
    title: '',
    candidateGames: [],
    date: '',
    slots: [],
    maxPlayers: 4
  });

  const games = [
    { name: 'FIFA 24', icon: '⚽', color: 'from-green-600 to-green-400' },
    { name: 'NBA 2K24', icon: '🏀', color: 'from-orange-600 to-orange-400' },
    { name: 'PUBG', icon: '🎮', color: 'from-blue-600 to-blue-400' },
    { name: 'Call of Duty', icon: '🎯', color: 'from-red-600 to-red-400' },
    { name: 'Fortnite', icon: '🏗️', color: 'from-purple-600 to-purple-400' },
    { name: 'Rocket League', icon: '🚗', color: 'from-cyan-600 to-cyan-400' }
  ];

  const recommendedGames = [
    { 
      name: 'FIFA 24', 
      icon: '⚽', 
      color: 'from-green-600 to-green-400',
      players: '1-4',
      genre: 'Spor',
      rating: 4.8,
      price: '₺899',
      description: 'Dünyanın en popüler futbol oyunu',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2a.jpg'
    },
    { 
      name: 'NBA 2K24', 
      icon: '🏀', 
      color: 'from-orange-600 to-orange-400',
      players: '1-4',
      genre: 'Spor',
      rating: 4.6,
      price: '₺799',
      description: 'En gerçekçi basketbol deneyimi',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co6w2b.jpg'
    },
    { 
      name: 'PUBG', 
      icon: '🎮', 
      color: 'from-blue-600 to-blue-400',
      players: '1-100',
      genre: 'Battle Royale',
      rating: 4.7,
      price: 'Ücretsiz',
      description: 'Hayatta kalma savaşı',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7y.jpg'
    },
    { 
      name: 'Call of Duty', 
      icon: '🎯', 
      color: 'from-red-600 to-red-400',
      players: '1-20',
      genre: 'FPS',
      rating: 4.5,
      price: '₺1299',
      description: 'Aksiyon dolu savaş deneyimi',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r7y.jpg'
    },
    { 
      name: 'Fortnite', 
      icon: '🏗️', 
      color: 'from-purple-600 to-purple-400',
      players: '1-100',
      genre: 'Battle Royale',
      rating: 4.4,
      price: 'Ücretsiz',
      description: 'Yapı inşa et ve savaş',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7z.jpg'
    },
    { 
      name: 'Rocket League', 
      icon: '🚗', 
      color: 'from-cyan-600 to-cyan-400',
      players: '1-8',
      genre: 'Spor',
      rating: 4.9,
      price: '₺299',
      description: 'Araba futbolu',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r80.jpg'
    },
    { 
      name: 'Valorant', 
      icon: '🎭', 
      color: 'from-pink-600 to-pink-400',
      players: '5v5',
      genre: 'FPS',
      rating: 4.6,
      price: 'Ücretsiz',
      description: 'Taktiksel FPS oyunu',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r80.jpg'
    },
    { 
      name: 'CS:GO 2', 
      icon: '💣', 
      color: 'from-yellow-600 to-yellow-400',
      players: '5v5',
      genre: 'FPS',
      rating: 4.8,
      price: 'Ücretsiz',
      description: 'Klasik taktiksel FPS',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r81.jpg'
    },
    { 
      name: 'League of Legends', 
      icon: '⚔️', 
      color: 'from-indigo-600 to-indigo-400',
      players: '5v5',
      genre: 'MOBA',
      rating: 4.7,
      price: 'Ücretsiz',
      description: 'Stratejik MOBA oyunu',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r82.jpg'
    },
    { 
      name: 'Minecraft', 
      icon: '🧱', 
      color: 'from-emerald-600 to-emerald-400',
      players: '1-8',
      genre: 'Sandbox',
      rating: 4.9,
      price: '₺199',
      description: 'Yaratıcılığını keşfet',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1r83.jpg'
    },
    { 
      name: 'Among Us', 
      icon: '👽', 
      color: 'from-teal-600 to-teal-400',
      players: '4-15',
      genre: 'Sosyal',
      rating: 4.3,
      price: '₺49',
      description: 'Gizli görev oyunu',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r82.jpg'
    },
    { 
      name: 'Fall Guys', 
      icon: '🟡', 
      color: 'from-amber-600 to-amber-400',
      players: '1-60',
      genre: 'Party',
      rating: 4.2,
      price: 'Ücretsiz',
      description: 'Eğlenceli yarış oyunu',
      image: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2r83.jpg'
    }
  ];

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const toggleGame = gameName => {
    const current = newParty.candidateGames;
    if (current.includes(gameName)) {
      setNewParty({ ...newParty, candidateGames: current.filter(g => g !== gameName) });
    } else if (current.length < 5) {
      setNewParty({ ...newParty, candidateGames: [...current, gameName] });
    }
  };

  const addSlot = () => {
    const time = prompt('Zaman aralığı girin (örn: 20:00-21:00)');
    if (time) {
      setNewParty({
        ...newParty,
        slots: [...newParty.slots, { id: Date.now(), time, votes: { yes: 0, no: 0 }, voters: [] }]
      });
    }
  };

  const createParty = () => {
    if (!newParty.title || newParty.candidateGames.length < 2 || !newParty.date || newParty.slots.length === 0) {
      alert('En az 2 oyun ve 1 zaman slotu ekleyin!');
      return;
    }
    const votes = {};
    newParty.candidateGames.forEach(g => votes[g] = { count: 0, voters: [] });
    const party = {
      id: Date.now(),
      title: newParty.title,
      candidateGames: newParty.candidateGames,
      votes,
      game: null,
      host: username || 'Sen',
      date: newParty.date,
      time: '',
      slots: newParty.slots,
      participants: [username || 'Sen'],
      maxPlayers: newParty.maxPlayers,
      status: 'voting',
      scores: null
    };
    setParties([party, ...parties]);
    setNewParty({ title: '', candidateGames: [], date: '', slots: [], maxPlayers: 4 });
    setShowNewParty(false);
  };

  const voteGame = (partyId, gameName) => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        const hasVoted = p.votes[gameName].voters.includes(username);
        const newVotes = { ...p.votes };
        
        if (hasVoted) {
          // Remove vote
          newVotes[gameName] = {
            count: p.votes[gameName].count - 1,
            voters: p.votes[gameName].voters.filter(v => v !== username)
          };
        } else {
          // Remove vote from other games first
          Object.keys(newVotes).forEach(game => {
            if (newVotes[game].voters.includes(username)) {
              newVotes[game] = {
                count: newVotes[game].count - 1,
                voters: newVotes[game].voters.filter(v => v !== username)
              };
            }
          });
          
          // Add vote to selected game
          newVotes[gameName] = {
            count: p.votes[gameName].count + 1,
            voters: [...p.votes[gameName].voters, username]
          };
        }
        
        return { ...p, votes: newVotes };
      }
      return p;
    }));
  };

  const voteSlot = (partyId, slotId, choice) => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        return {
          ...p,
          slots: p.slots.map(s => {
            if (s.id === slotId) {
              const hasVoted = s.voters.includes(username);
              const currentVote = s.voters.includes(username) ? 
                (s.votes.yes > s.votes.no ? 'yes' : 'no') : null;
              
              if (hasVoted && currentVote === choice) {
                // Remove vote
                return {
                  ...s,
                  votes: {
                    yes: s.votes.yes - (choice === 'yes' ? 1 : 0),
                    no: s.votes.no - (choice === 'no' ? 1 : 0)
                  },
                  voters: s.voters.filter(v => v !== username)
                };
              } else {
                // Remove from other slots first
                const updatedSlots = p.slots.map(slot => {
                  if (slot.voters.includes(username)) {
                    return {
                      ...slot,
                      votes: {
                        yes: slot.votes.yes - (slot.votes.yes > slot.votes.no ? 1 : 0),
                        no: slot.votes.no - (slot.votes.no > slot.votes.yes ? 1 : 0)
                      },
                      voters: slot.voters.filter(v => v !== username)
                    };
                  }
                  return slot;
                });
                
                // Add new vote
                return {
                  ...s,
                  votes: {
                    yes: s.votes.yes + (choice === 'yes' ? 1 : 0),
                    no: s.votes.no + (choice === 'no' ? 1 : 0)
                  },
                  voters: [...s.voters, username]
                };
              }
            }
            return s;
          })
        };
      }
      return p;
    }));
  };

  const finalize = partyId => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        const winningGame = Object.keys(p.votes).reduce((a, b) => 
          p.votes[a].count > p.votes[b].count ? a : b
        );
        const winningSlot = p.slots.reduce((a, b) => 
          a.votes.yes > b.votes.yes ? a : b
        );
        return { ...p, game: winningGame, time: winningSlot.time, status: 'upcoming' };
      }
      return p;
    }));
    setShowVoting(null);
  };

  const join = partyId => {
    setParties(parties.map(p => {
      if (p.id === partyId && !p.participants.includes(username) && p.participants.length < p.maxPlayers) {
        return { ...p, participants: [...p.participants, username] };
      }
      return p;
    }));
  };

  const openScoreModal = party => {
    setSelectedParty(party);
    setScoreData(party.participants.map(p => ({ player: p, score: 0, result: 'lose' })));
  };

  const finishParty = () => {
    if (!selectedParty) return;
    const processedScores = scoreData.map(s => ({
      ...s,
      points: s.result === 'win' ? 3 : s.result === 'draw' ? 1 : 0
    }));
    setParties(parties.map(p => {
      if (p.id === selectedParty.id) {
        return { ...p, status: 'completed', scores: processedScores };
      }
      return p;
    }));
    setSelectedParty(null);
    setScoreData([]);
    setShowSummary(selectedParty.id);
  };

  const sendFriendRequest = (friendId, friendName) => {
    // Simulate sending friend request
    alert(`Arkadaşlık isteği ${friendName} kullanıcısına gönderildi!`);
  };

  const addNewFriend = (friendName) => {
    if (!friendName.trim()) return;
    
    const newConversation = {
      id: `chat_${friendName.toLowerCase()}_${Date.now()}`,
      name: friendName,
      avatar: friendName[0].toUpperCase(),
      lastMessage: 'Yeni arkadaş eklendi!',
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      unread: false,
      messages: [
        { 
          id: Date.now(), 
          from: friendName, 
          text: `Merhaba! Ben ${friendName}, nasılsın?`, 
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), 
          isOwn: false 
        },
        { 
          id: Date.now() + 1, 
          from: username || 'Oyuncu123', 
          text: `Merhaba ${friendName}! Ben de iyiyim, sen nasılsın?`, 
          time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }), 
          isOwn: true 
        }
      ]
    };

    const updatedConversations = [newConversation, ...conversations];
    setConversations(updatedConversations);
    localStorage.setItem('gamePartyHub_conversations', JSON.stringify(updatedConversations));
    
    // Add to friends list
    setFriends([...friends, { 
      id: `user_${friendName.toLowerCase()}_${Date.now()}`, 
      name: friendName, 
      status: 'online', 
      game: '' 
    }]);
  };

  const simulateMessage = (conversationId, messageText) => {
    const message = {
      id: Date.now(),
      from: conversations.find(c => c.id === conversationId)?.name || 'Arkadaş',
      text: messageText,
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: false
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: message.text,
          time: message.time,
          unread: true
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    localStorage.setItem('gamePartyHub_conversations', JSON.stringify(updatedConversations));
  };

  const sendGlobalMessage = () => {
    if (!globalMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      from: username || 'Oyuncu123',
      text: globalMessage.trim(),
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    const updatedGlobalChat = [...globalChat, message];
    setGlobalChat(updatedGlobalChat);
    localStorage.setItem('gamePartyHub_globalChat', JSON.stringify(updatedGlobalChat));
    setGlobalMessage('');
  };

  const acceptFriendRequest = (requestId) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request) {
      setFriends([...friends, { id: request.fromId, name: request.from, status: 'online', game: '' }]);
      setFriendRequests(friendRequests.filter(r => r.id !== requestId));
    }
  };

  const rejectFriendRequest = (requestId) => {
    setFriendRequests(friendRequests.filter(r => r.id !== requestId));
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const message = {
      id: Date.now(),
      from: username || 'Sen',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedChat.id) {
        const updatedConv = {
          ...conv,
          messages: [...conv.messages, message],
          lastMessage: message.text,
          time: message.time,
          unread: false
        };
        return updatedConv;
      }
      return conv;
    });

    setConversations(updatedConversations);
    
    // Update selectedChat to show the new message immediately
    const updatedSelectedChat = updatedConversations.find(conv => conv.id === selectedChat.id);
    setSelectedChat(updatedSelectedChat);
    
    // Save to localStorage for cross-tab communication
    localStorage.setItem('gamePartyHub_conversations', JSON.stringify(updatedConversations));
    
    setNewMessage('');
  };

  const openChat = (conversation) => {
    setSelectedChat(conversation);
    // Mark as read
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unread: false };
      }
      return conv;
    });
    setConversations(updatedConversations);
    localStorage.setItem('gamePartyHub_conversations', JSON.stringify(updatedConversations));
  };

  // Cross-tab and cross-instance communication
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'gamePartyHub_conversations' && e.newValue) {
        const updatedConversations = JSON.parse(e.newValue);
        setConversations(updatedConversations);
        
        // Update selectedChat if it exists
        if (selectedChat) {
          const updatedSelectedChat = updatedConversations.find(conv => conv.id === selectedChat.id);
          if (updatedSelectedChat) {
            setSelectedChat(updatedSelectedChat);
          }
        }
      }
      
      if (e.key === 'gamePartyHub_globalChat' && e.newValue) {
        const updatedGlobalChat = JSON.parse(e.newValue);
        setGlobalChat(updatedGlobalChat);
      }
    };

    // Polling for cross-instance updates (every 2 seconds)
    const pollForUpdates = () => {
      const savedGlobalChat = localStorage.getItem('gamePartyHub_globalChat');
      if (savedGlobalChat) {
        const parsedGlobalChat = JSON.parse(savedGlobalChat);
        if (JSON.stringify(parsedGlobalChat) !== JSON.stringify(globalChat)) {
          setGlobalChat(parsedGlobalChat);
        }
      }
      
      const savedConversations = localStorage.getItem('gamePartyHub_conversations');
      if (savedConversations) {
        const parsedConversations = JSON.parse(savedConversations);
        if (JSON.stringify(parsedConversations) !== JSON.stringify(conversations)) {
          setConversations(parsedConversations);
          if (selectedChat) {
            const updatedSelectedChat = parsedConversations.find(conv => conv.id === selectedChat.id);
            if (updatedSelectedChat) {
              setSelectedChat(updatedSelectedChat);
            }
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    const pollInterval = setInterval(pollForUpdates, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(pollInterval);
    };
  }, [selectedChat, globalChat, conversations]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* 3D Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse transform rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse transform -rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse transform rotate-12"></div>
        </div>
        
        <div className="w-full max-w-md relative z-10">
          <div className="bg-gray-900 bg-opacity-90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700 transform hover:scale-105 transition-all duration-500 hover:rotate-1">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-5xl shadow-lg shadow-purple-500/50 transform hover:scale-110 hover:rotate-12 transition-all duration-300 animate-bounce">
                🎮
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
              Game+ Party Hub
            </h1>
            <p className="text-gray-400 text-center mb-8 transform hover:scale-105 transition-all duration-300">Arkadaşlarınla oyna, skorları takip et!</p>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 transform hover:scale-105 transition-all duration-300">Kullanıcı Adı</label>
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transform hover:scale-105 focus:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  placeholder="Adını gir..."
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2 transform hover:scale-105 transition-all duration-300">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transform hover:scale-105 focus:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                  placeholder="Şifre gir..."
                />
              </div>
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300 active:scale-95"
              >
                🚀 Giriş Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredParties = parties.filter(p => 
    activeTab === 'parties' ? p.status !== 'completed' : p.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse transform rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse transform -rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse transform rotate-12"></div>
      </div>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-6 border border-gray-800 shadow-xl transform hover:scale-105 transition-all duration-500 relative z-10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl shadow-lg shadow-purple-500/50 transform hover:scale-110 hover:rotate-12 transition-all duration-300 animate-pulse">
                  🎮
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transform hover:scale-105 transition-all duration-300">
                    Game+ Party Hub
                  </h1>
                  <p className="text-gray-400 text-xs sm:text-sm transform hover:scale-105 transition-all duration-300">Hoşgeldin, {username}!</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowGlobalChat(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center gap-2 text-sm transform hover:scale-105 hover:-translate-y-1 duration-300"
                >
                  🌍 Global Sohbet
                </button>
                <button
                  onClick={() => setShowMessages(true)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-all flex items-center gap-2 text-sm relative transform hover:scale-105 hover:-translate-y-1 duration-300"
                >
                  💬 Mesajlar
                  {conversations.some(c => c.unread) && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white animate-bounce">
                      {conversations.filter(c => c.unread).length}
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setShowFriendRequests(true)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-all flex items-center gap-2 text-sm relative transform hover:scale-105 hover:-translate-y-1 duration-300"
                >
                  👥 Arkadaşlar
                  {friendRequests.length > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white animate-bounce">
                      {friendRequests.length}
                    </div>
                  )}
                </button>
                <button
                  onClick={() => setShowProfile(true)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-xl hover:bg-gray-700 transition-all flex items-center gap-2 text-sm transform hover:scale-105 hover:-translate-y-1 duration-300"
                >
                  👤 Profil
                </button>
                <button
                  onClick={() => setShowNewParty(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 font-semibold transform hover:scale-105 hover:-translate-y-1 duration-300"
                >
                  ➕ Yeni Party
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Games Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">🎮 Önerilen Oyunlar</h2>
              <div className="text-sm text-gray-400">Popüler oyunlar</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {recommendedGames.map((game, index) => (
                <div 
                  key={game.name} 
                  className="bg-gray-900 bg-opacity-80 rounded-xl p-4 border border-gray-800 shadow-xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 relative z-10 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Game Image */}
                  <div className="relative mb-3">
                    <div className={`w-full h-24 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center text-4xl transform group-hover:scale-110 transition-all duration-300`}>
                      {game.icon}
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                      {game.rating} ⭐
                    </div>
                  </div>
                  
                  {/* Game Info */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white truncate">{game.name}</h3>
                    <p className="text-xs text-gray-400">{game.genre}</p>
                    <p className="text-xs text-gray-500">{game.players} oyuncu</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-400">{game.players} slot</span>
                      <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-all transform hover:scale-105">
                        Oyna
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('parties')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'parties' ? 'bg-gray-900 bg-opacity-90 text-blue-400 border border-gray-700 shadow-lg' : 'bg-gray-900 bg-opacity-50 text-gray-400 border border-gray-800'
              }`}
            >
              🎮 Aktif
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'completed' ? 'bg-gray-900 bg-opacity-90 text-blue-400 border border-gray-700 shadow-lg' : 'bg-gray-900 bg-opacity-50 text-gray-400 border border-gray-800'
              }`}
            >
              🏆 Tamamlanan
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl">
              🎮
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Game+
            </h1>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('parties')}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                activeTab === 'parties' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Aktif
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                activeTab === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}
            >
              Tamamlanan
            </button>
          </div>
        </div>

        {/* Mobile Recommended Games */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-4">🎮 Önerilen Oyunlar</h2>
          <div className="grid grid-cols-2 gap-3">
            {recommendedGames.slice(0, 6).map((game, index) => (
              <div 
                key={game.name} 
                className="bg-gray-900 bg-opacity-80 rounded-lg p-3 border border-gray-800 shadow-lg transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-full h-16 bg-gradient-to-br ${game.color} rounded-lg flex items-center justify-center text-2xl mb-2`}>
                  {game.icon}
                </div>
                <h3 className="text-xs font-bold text-white truncate">{game.name}</h3>
                <p className="text-xs text-gray-400">{game.genre}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-blue-400">{game.players} slot</span>
                  <span className="text-xs text-yellow-400">{game.rating}⭐</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-24 md:pb-6">
        {filteredParties.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 bg-opacity-80 rounded-2xl border border-gray-800 shadow-xl">
            <div className="text-6xl mb-4">🎮</div>
            <p className="text-gray-400">Henüz party yok</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredParties.map(party => {
              const game = games.find(g => g.name === party.game);
              const isHost = party.host === username;
              const isParticipant = party.participants.includes(username);
              const spotsLeft = party.maxPlayers - party.participants.length;
              
              return (
                <div key={party.id} className="bg-gray-900 bg-opacity-80 rounded-xl p-3 border border-gray-800 shadow-xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 relative z-10">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{party.title}</h3>
                      <p className="text-xs text-gray-400">{party.host}</p>
                      {party.game && <p className="text-xs text-gray-500">{party.game}</p>}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs h-fit ${
                      party.status === 'voting' ? 'bg-yellow-500 bg-opacity-20 text-yellow-400' : 
                      party.status === 'upcoming' ? 'bg-green-500 bg-opacity-20 text-green-400' : 
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {party.status === 'voting' ? '📊' : party.status === 'upcoming' ? '⏰' : '✅'}
                    </span>
                  </div>

                  <div className="mb-2">
                    <div className="flex gap-1 flex-wrap">
                      {party.participants.map((p, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-500 bg-opacity-20 text-blue-400 rounded text-xs">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {party.status === 'voting' && (
                    <div className="flex gap-2">
                      <button onClick={() => setShowVoting(party.id)} className="flex-1 bg-yellow-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300">
                        📊 Oy Ver
                      </button>
                      {isHost && (
                        <button onClick={() => finalize(party.id)} className="flex-1 bg-green-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300">
                          🔒 Kilitle
                        </button>
                      )}
                    </div>
                  )}
                  
                  {party.status === 'upcoming' && (
                    <div className="flex gap-2">
                      {!isParticipant && spotsLeft > 0 && (
                        <button onClick={() => join(party.id)} className="flex-1 bg-blue-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300">
                          ✨ Katıl
                        </button>
                      )}
                      {isHost && (
                        <button onClick={() => openScoreModal(party)} className="flex-1 bg-green-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300">
                          🏁 Bitir
                        </button>
                      )}
                    </div>
                  )}
                  
                  {party.status === 'completed' && (
                    <button onClick={() => setShowSummary(party.id)} className="w-full bg-purple-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-purple-700 transition-all transform hover:scale-105 hover:-translate-y-1 duration-300">
                      📊 Özet
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-2 py-3 flex items-center justify-between z-40">
        <button
          onClick={() => setShowGlobalChat(true)}
          className="flex flex-col items-center"
        >
          <div className="text-2xl">🌍</div>
          <span className="text-xs text-gray-400">Global</span>
        </button>

        <button
          onClick={() => setShowMessages(true)}
          className="flex flex-col items-center relative"
        >
          <div className="text-2xl">💬</div>
          <span className="text-xs text-gray-400">Mesajlar</span>
          {conversations.some(c => c.unread) && (
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </button>

        <button
          onClick={() => setShowNewParty(true)}
          className="relative -mt-6"
        >
          <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
            <span className="text-3xl">➕</span>
          </div>
        </button>

        <button
          onClick={() => setShowFriendRequests(true)}
          className="flex flex-col items-center relative"
        >
          <div className="text-2xl">👥</div>
          <span className="text-xs text-gray-400">Arkadaşlar</span>
          {friendRequests.length > 0 && (
            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          )}
        </button>

        <button 
          onClick={() => setShowProfile(true)}
          className="flex flex-col items-center"
        >
          <div className="text-2xl">👤</div>
          <span className="text-xs text-gray-400">Profil</span>
        </button>
      </div>

      {/* Messages Sidebar */}
      {showMessages && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMessages(false)}></div>
          <div className="fixed top-0 left-0 bottom-0 w-80 bg-gray-900 border-r border-gray-800 z-50 shadow-2xl flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">💬 Mesajlar</h2>
              <button onClick={() => setShowMessages(false)} className="text-gray-400 hover:text-white text-2xl">
                ✕
              </button>
            </div>
            
            {!selectedChat ? (
              <div className="overflow-y-auto flex-1">
                {conversations.map(conv => (
                  <div 
                    key={conv.id} 
                    className={`p-4 border-b border-gray-800 hover:bg-gray-800 cursor-pointer ${conv.unread ? 'bg-gray-800 bg-opacity-50' : ''}`}
                    onClick={() => openChat(conv)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {conv.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-white text-sm">{conv.name}</span>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col flex-1">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="text-gray-400 hover:text-white text-xl"
                  >
                    ←
                  </button>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{selectedChat.name}</div>
                    <div className="text-xs text-green-400">🟢 Çevrimiçi</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {selectedChat.messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg ${
                        msg.isOwn 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-800 text-white'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.isOwn ? 'text-blue-200' : 'text-gray-400'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-800">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Mesaj yazın..."
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <button
                      onClick={sendMessage}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      📤
                    </button>
                  </div>
                  
                  {/* Test Cross-tab Communication */}
                  <div className="mt-2">
                    <button
                      onClick={() => simulateMessage(selectedChat.id, 'Bu mesaj başka sekmeden geldi! 🚀')}
                      className="w-full bg-green-600 text-white py-1 rounded text-xs hover:bg-green-700 transition-all"
                    >
                      🧪 Test: Başka Sekmeden Mesaj Gönder
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Global Chat Modal */}
      {showGlobalChat && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowGlobalChat(false)}></div>
          <div className="fixed top-0 left-0 bottom-0 w-full md:w-96 bg-gray-900 border-r border-gray-800 z-50 shadow-2xl flex flex-col">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  🌍
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Global Sohbet</h2>
                  <p className="text-xs text-green-400">Herkesle konuş!</p>
                </div>
              </div>
              <button onClick={() => setShowGlobalChat(false)} className="text-gray-400 hover:text-white text-2xl">
                ✕
              </button>
            </div>

            {/* Global Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {globalChat.map((msg, index) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} transform transition-all duration-500 hover:scale-105`} style={{ animationDelay: `${index * 100}ms` }}>
                  <div className={`max-w-xs px-3 py-2 rounded-lg transform hover:scale-110 transition-all duration-300 ${
                    msg.isOwn 
                      ? 'bg-green-600 text-white hover:shadow-lg hover:shadow-green-500/50' 
                      : 'bg-gray-800 text-white hover:shadow-lg hover:shadow-gray-500/50'
                  }`}>
                    <div className="text-xs font-semibold mb-1">
                      {msg.isOwn ? 'Sen' : msg.from}
                    </div>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.isOwn ? 'text-green-200' : 'text-gray-400'
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Global Message Input */}
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={globalMessage}
                  onChange={(e) => setGlobalMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendGlobalMessage()}
                  placeholder="Global sohbete mesaj yazın..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500 focus:outline-none text-sm"
                />
                <button
                  onClick={sendGlobalMessage}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                >
                  🌍
                </button>
              </div>
              
              {/* Online Users */}
              <div className="mt-3">
                <div className="text-xs text-gray-400 mb-2">Çevrimiçi: {friends.length + 1} kişi</div>
                <div className="flex gap-1 flex-wrap">
                  <div className="px-2 py-1 bg-green-600 bg-opacity-20 text-green-400 rounded text-xs">
                    {username || 'Sen'} (Sen)
                  </div>
                  {friends.map(friend => (
                    <div key={friend.id} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {friend.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Profile Sidebar */}
      {showProfile && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowProfile(false)}></div>
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900 border-l border-gray-800 z-50 shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
              <h2 className="text-xl font-bold text-white">👤 Profil</h2>
              <button onClick={() => setShowProfile(false)} className="text-gray-400 hover:text-white text-2xl">
                ✕
              </button>
            </div>

            <div className="p-4">
              {/* User Info */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 mb-4 text-center">
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-3 flex items-center justify-center text-3xl">
                  🎮
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{userProfile.username}</h3>
                <div className="inline-block bg-yellow-500 bg-opacity-20 text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {userProfile.rank}
                </div>
              </div>

              {/* Stats */}
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-white mb-3">📊 İstatistikler</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700 rounded-lg p-2 text-center">
                    <div className="text-2xl font-bold text-blue-400">{userProfile.totalGames}</div>
                    <div className="text-xs text-gray-400">Toplam Maç</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 text-center">
                    <div className="text-2xl font-bold text-green-400">{userProfile.wins}</div>
                    <div className="text-xs text-gray-400">Galibiyet</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 text-center">
                    <div className="text-2xl font-bold text-red-400">{userProfile.losses}</div>
                    <div className="text-xs text-gray-400">Mağlubiyet</div>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{userProfile.winRate}%</div>
                    <div className="text-xs text-gray-400">Kazanma Oranı</div>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-purple-500 bg-opacity-20 rounded-lg text-center">
                  <div className="text-sm text-purple-300">Toplam Skor: <span className="font-bold">{userProfile.totalScore}</span></div>
                </div>
              </div>

              {/* Game Statistics */}
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-white mb-3">📊 Oyun İstatistikleri</h4>
                
                {/* Most Played Games */}
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-gray-300 mb-2">🎮 En Çok Oynanan Oyunlar</h5>
                  <div className="space-y-2">
                    {userProfile.gameStats
                      .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
                      .slice(0, 3)
                      .map((stat, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{games.find(game => game.name === stat.game)?.icon}</span>
                            <div>
                              <div className="text-xs font-medium text-white">{stat.game}</div>
                              <div className="text-xs text-gray-400">{stat.gamesPlayed} oyun</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-blue-400">{stat.wins} galibiyet</div>
                            <div className="text-xs text-gray-400">{stat.totalScore} puan</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Highest Win Rate Games */}
                <div>
                  <h5 className="text-xs font-medium text-gray-300 mb-2">🏆 En Yüksek Başarı Oranı</h5>
                  <div className="space-y-2">
                    {userProfile.gameStats
                      .sort((a, b) => b.winRate - a.winRate)
                      .slice(0, 3)
                      .map((stat, i) => (
                        <div key={i} className="bg-gray-700 rounded-lg p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{games.find(game => game.name === stat.game)?.icon}</span>
                            <div>
                              <div className="text-xs font-medium text-white">{stat.game}</div>
                              <div className="text-xs text-gray-400">{stat.gamesPlayed} oyun</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-semibold text-green-400">{stat.winRate}% kazanma</div>
                            <div className="text-xs text-gray-400">{stat.wins}/{stat.gamesPlayed}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Recent Games */}
              <div className="bg-gray-800 rounded-xl p-4 mb-4">
                <h4 className="text-sm font-semibold text-white mb-3">🎯 Son Oyunlar</h4>
                <div className="space-y-2">
                  {userProfile.recentGames.map((g, i) => (
                    <div key={i} className="bg-gray-700 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{games.find(game => game.name === g.game)?.icon}</span>
                        <div>
                          <div className="text-xs font-medium text-white">{g.game}</div>
                          <div className="text-xs text-gray-400">{g.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-semibold ${g.result === 'win' ? 'text-green-400' : 'text-red-400'}`}>
                          {g.result === 'win' ? '🏆 Kazandı' : '❌ Kaybetti'}
                        </div>
                        <div className="text-xs text-gray-400">{g.score} puan</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Online Friends */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-white mb-3">🟢 Çevrimiçi Arkadaşlar</h4>
                <div className="space-y-2">
                  {userProfile.onlineFriends.map((friend, i) => (
                    <div key={i} className="bg-gray-700 rounded-lg p-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {friend.name[0]}
                          </div>
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-700"></div>
                        </div>
                        <div>
                          <div className="text-xs font-medium text-white">{friend.name}</div>
                          <div className="text-xs text-gray-400">{friend.game}</div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400">{friend.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Friend Requests Sidebar */}
      {showFriendRequests && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowFriendRequests(false)}></div>
          <div className="fixed top-0 right-0 bottom-0 w-80 bg-gray-900 border-l border-gray-800 z-50 shadow-2xl overflow-y-auto">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 bg-gray-900 z-10">
              <h2 className="text-xl font-bold text-white">👥 Arkadaşlar</h2>
              <button onClick={() => setShowFriendRequests(false)} className="text-gray-400 hover:text-white text-2xl">
                ✕
              </button>
            </div>

            <div className="p-4">
              {/* Friend Requests */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">📨 Arkadaşlık İstekleri</h3>
                {friendRequests.length === 0 ? (
                  <p className="text-gray-400 text-sm">Henüz arkadaşlık isteği yok</p>
                ) : (
                  <div className="space-y-3">
                    {friendRequests.map(request => (
                      <div key={request.id} className="bg-gray-800 rounded-xl p-3">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {request.from[0]}
                          </div>
                          <div className="flex-1">
                            <div className="text-white font-semibold">{request.from}</div>
                            <div className="text-gray-400 text-xs">{request.time}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => acceptFriendRequest(request.id)}
                            className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all"
                          >
                            ✅ Kabul Et
                          </button>
                          <button
                            onClick={() => rejectFriendRequest(request.id)}
                            className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all"
                          >
                            ❌ Reddet
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Current Friends */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">🟢 Çevrimiçi Arkadaşlar</h3>
                <div className="space-y-2">
                  {friends.map(friend => (
                    <div key={friend.id} className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {friend.name[0]}
                          </div>
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm">{friend.name}</div>
                          <div className="text-gray-400 text-xs">{friend.game || 'Çevrimiçi'}</div>
                        </div>
                      </div>
                      <div className="text-xs text-green-400">🟢</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Friend */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">➕ Arkadaş Ekle</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    id="friendSearchInput"
                    placeholder="Kullanıcı adı girin..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.target;
                        addNewFriend(input.value);
                        input.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('friendSearchInput');
                      addNewFriend(input.value);
                      input.value = '';
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all"
                  >
                    ➕ Arkadaş Ekle
                  </button>
                </div>
                
                {/* Quick Add Buttons */}
                <div className="mt-3">
                  <h4 className="text-sm text-gray-300 mb-2">Hızlı Ekle:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {['Can', 'Deniz', 'Ece', 'Burak'].map(name => (
                      <button
                        key={name}
                        onClick={() => addNewFriend(name)}
                        className="px-3 py-1 bg-gray-700 text-white rounded-lg text-xs hover:bg-gray-600 transition-all"
                      >
                        + {name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* New Party Modal */}
      {showNewParty && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full my-8 border border-gray-800 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">🎉 Yeni Party</h2>
              <button onClick={() => setShowNewParty(false)} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>
            
            <div className="space-y-3">
              <input
                type="text"
                value={newParty.title}
                onChange={e => setNewParty({ ...newParty, title: e.target.value })}
                placeholder="Party Başlığı"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none text-sm"
              />
              
              <div>
                <p className="text-xs text-gray-400 mb-2">{newParty.candidateGames.length} oyun seçildi (En az 2)</p>
                <div className="grid grid-cols-2 gap-2">
                  {games.map(g => (
                    <button
                      key={g.name}
                      onClick={() => toggleGame(g.name)}
                      className={`p-2 rounded-lg border transition-all flex items-center gap-2 ${
                        newParty.candidateGames.includes(g.name) 
                          ? 'border-blue-500 bg-blue-500 bg-opacity-20' 
                          : 'border-gray-700 bg-gray-800'
                      }`}
                    >
                      <span className="text-xl">{g.icon}</span>
                      <span className="text-xs text-white">{g.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <input
                type="date"
                value={newParty.date}
                onChange={e => setNewParty({ ...newParty, date: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:outline-none text-sm"
              />
              
              <button 
                onClick={addSlot} 
                className="w-full bg-gray-800 text-white py-2 rounded-xl text-sm"
              >
                ➕ Zaman Slotu Ekle ({newParty.slots.length})
              </button>
              
              {newParty.slots.length > 0 && (
                <div className="space-y-1">
                  {newParty.slots.map((slot, idx) => (
                    <div key={idx} className="text-xs text-gray-400 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                      🕐 {slot.time}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowNewParty(false)}
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-xl text-sm"
              >
                İptal
              </button>
              <button
                onClick={createParty}
                className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm"
              >
                🚀 Oluştur
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voting Modal */}
      {showVoting && (() => {
        const party = parties.find(p => p.id === showVoting);
        if (!party) return null;
        const totalVotes = Object.values(party.votes).reduce((sum, v) => sum + v.count, 0);
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-gray-900 rounded-2xl p-4 max-w-2xl w-full my-8 border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">📊 Oylama</h3>
                <button onClick={() => setShowVoting(null)} className="text-gray-400 text-xl">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Oyun Seçimi</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {party.candidateGames.map(gameName => {
                      const game = games.find(g => g.name === gameName);
                      const voteData = party.votes[gameName];
                      const percentage = totalVotes > 0 ? Math.round((voteData.count / totalVotes) * 100) : 0;
                      const hasVoted = voteData.voters.includes(username);
                      
                      return (
                        <button
                          key={gameName}
                          onClick={() => voteGame(party.id, gameName)}
                          className={`p-3 rounded-xl border transition-all ${
                            hasVoted 
                              ? 'bg-blue-600 border-blue-500 shadow-lg shadow-blue-500/50' 
                              : 'bg-gray-800 border-gray-700 hover:border-blue-500'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{game?.icon}</span>
                            <div className="text-left flex-1">
                              <div className="font-medium text-white text-xs">{gameName}</div>
                              <div className="text-xs text-gray-400">{voteData.count} oy</div>
                              {hasVoted && <div className="text-xs text-blue-300">✓ Oyladın</div>}
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full bg-gradient-to-r ${game?.color}`} style={{ width: `${percentage}%` }} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Zaman Slotu</h4>
                  <div className="space-y-2">
                    {party.slots.map(slot => {
                      const hasVoted = slot.voters.includes(username);
                      const userVote = hasVoted ? (slot.votes.yes > slot.votes.no ? 'yes' : 'no') : null;
                      return (
                        <div key={slot.id} className="p-2 bg-gray-800 rounded-xl border border-gray-700">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white text-xs">🕐 {slot.time}</span>
                            <span className="text-xs text-gray-400">✅ {slot.votes.yes} | ❌ {slot.votes.no}</span>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => voteSlot(party.id, slot.id, 'yes')}
                              className={`flex-1 py-1.5 rounded-lg text-xs transition-all ${
                                userVote === 'yes' 
                                  ? 'bg-green-700 border-2 border-green-400' 
                                  : 'bg-green-600 hover:bg-green-700'
                              }`}
                            >
                              ✅ Uygun {userVote === 'yes' && '(Seçili)'}
                            </button>
                            <button
                              onClick={() => voteSlot(party.id, slot.id, 'no')}
                              className={`flex-1 py-1.5 rounded-lg text-xs transition-all ${
                                userVote === 'no' 
                                  ? 'bg-red-700 border-2 border-red-400' 
                                  : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              ❌ Değil {userVote === 'no' && '(Seçili)'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowVoting(null)}
                className="w-full mt-4 px-3 py-2 bg-gray-800 text-white rounded-xl text-sm"
              >
                Kapat
              </button>
            </div>
          </div>
        );
      })()}

      {/* Score Modal */}
      {selectedParty && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-4 max-w-md w-full border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">🏆 Skorlar</h3>
              <button onClick={() => setSelectedParty(null)} className="text-gray-400 text-xl">✕</button>
            </div>
            <div className="space-y-2 mb-4">
              {scoreData.map((s, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{s.player}</span>
                    <input
                      type="number"
                      value={s.score}
                      onChange={e => {
                        const newData = [...scoreData];
                        newData[i].score = parseInt(e.target.value) || 0;
                        setScoreData(newData);
                      }}
                      className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm"
                    />
                  </div>
                  <select
                    value={s.result}
                    onChange={e => {
                      const newData = [...scoreData];
                      newData[i].result = e.target.value;
                      setScoreData(newData);
                    }}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs"
                  >
                    <option value="win">🏆 Kazandı (3p)</option>
                    <option value="draw">🤝 Berabere (1p)</option>
                    <option value="lose">❌ Kaybetti (0p)</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedParty(null)}
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-xl text-sm"
              >
                İptal
              </button>
              <button
                onClick={finishParty}
                className="flex-1 px-3 py-2 bg-green-600 text-white rounded-xl text-sm"
              >
                💾 Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Summary Modal */}
      {showSummary && (() => {
        const party = parties.find(p => p.id === showSummary);
        if (!party || !party.scores) return null;
        const sortedScores = [...party.scores].sort((a, b) => b.points - a.points);
        const mvp = sortedScores[0];
        
        return (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-4 max-w-md w-full border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">🎉 Özet</h3>
                <button onClick={() => setShowSummary(null)} className="text-gray-400 text-xl">✕</button>
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-3 text-center">
                  <div className="text-3xl mb-1">👑</div>
                  <div className="text-white font-bold">MVP: {mvp.player}</div>
                  <div className="text-yellow-200 text-xs">{mvp.points} Puan</div>
                </div>

                <div className="bg-gray-800 rounded-xl p-3">
                  <div className="text-gray-400 text-xs mb-2">🏆 Liderlik Tablosu</div>
                  <div className="space-y-1">
                    {sortedScores.map((s, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="flex items-center gap-1 text-white">
                          {i === 0 && <span>🥇</span>}
                          {i === 1 && <span>🥈</span>}
                          {i === 2 && <span>🥉</span>}
                          <span className={i === 0 ? 'font-bold text-yellow-400 text-xs' : 'text-xs'}>{s.player}</span>
                        </span>
                        <span className="font-semibold text-white text-xs">{s.points}p</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert('Paylaşıldı!')}
                className="w-full px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm mb-2"
              >
                📤 Paylaş
              </button>
              
              <button
                onClick={() => setShowSummary(null)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded-xl text-sm"
              >
                Kapat
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default GamePartyHub;
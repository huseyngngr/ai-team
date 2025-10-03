import React, { useState, useEffect } from 'react';

const GamePartyHub = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentVideo, setCurrentVideo] = useState(0);
  const [parties, setParties] = useState([]);
  const [showNewParty, setShowNewParty] = useState(false);
  const [showVoting, setShowVoting] = useState(null);
  const [showSummary, setShowSummary] = useState(null);
  const [activeTab, setActiveTab] = useState('parties');
  const [selectedParty, setSelectedParty] = useState(null);
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

  const videos = [
    'https://cdn.cloudflare.steamstatic.com/steam/apps/256963350/movie480_vp9.webm',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/256887506/movie480_vp9.webm',
    'https://cdn.cloudflare.steamstatic.com/steam/apps/256961431/movie480_vp9.webm'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const toggleGame = (gameName) => {
    const current = newParty.candidateGames;
    if (current.includes(gameName)) {
      setNewParty({ ...newParty, candidateGames: current.filter(g => g !== gameName) });
    } else if (current.length < 5) {
      setNewParty({ ...newParty, candidateGames: [...current, gameName] });
    }
  };

  const addSlot = () => {
    const time = prompt('Zaman aralığı (örn: 20:00-21:00)');
    if (time) {
      setNewParty({
        ...newParty,
        slots: [...newParty.slots, { time, votes: { yes: 0, no: 0 } }]
      });
    }
  };

  const createParty = () => {
    if (newParty.title && newParty.candidateGames.length >= 2 && newParty.date && newParty.slots.length > 0) {
      const votes = {};
      newParty.candidateGames.forEach(g => votes[g] = 0);
      
      const party = {
        id: Date.now(),
        title: newParty.title,
        candidateGames: newParty.candidateGames,
        votes,
        game: null,
        host: username,
        date: newParty.date,
        time: '',
        slots: newParty.slots.map((s, i) => ({ id: i, ...s })),
        participants: [username],
        maxPlayers: newParty.maxPlayers,
        status: 'voting',
        scores: null
      };
      setParties([party, ...parties]);
      setNewParty({ title: '', candidateGames: [], date: '', slots: [], maxPlayers: 4 });
      setShowNewParty(false);
    } else {
      alert('En az 2 oyun ve 1 slot ekleyin!');
    }
  };

  const voteGame = (partyId, gameName) => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        return { ...p, votes: { ...p.votes, [gameName]: (p.votes[gameName] || 0) + 1 } };
      }
      return p;
    }));
  };

  const voteSlot = (partyId, slotId, choice) => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        return {
          ...p,
          slots: p.slots.map(s => s.id === slotId ? {
            ...s,
            votes: {
              yes: s.votes.yes + (choice === 'yes' ? 1 : 0),
              no: s.votes.no + (choice === 'no' ? 1 : 0)
            }
          } : s)
        };
      }
      return p;
    }));
  };

  const finalize = (partyId) => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        const game = Object.keys(p.votes).reduce((a, b) => p.votes[a] > p.votes[b] ? a : b);
        const slot = p.slots.reduce((a, b) => a.votes.yes > b.votes.yes ? a : b);
        return { ...p, game, time: slot.time, status: 'upcoming' };
      }
      return p;
    }));
  };

  const join = (partyId) => {
    setParties(parties.map(p => {
      if (p.id === partyId && !p.participants.includes(username)) {
        return { ...p, participants: [...p.participants, username] };
      }
      return p;
    }));
  };

  const finish = (partyId, scores) => {
    setParties(parties.map(p => {
      if (p.id === partyId) {
        const processedScores = scores.map(s => ({
          ...s,
          points: s.result === 'win' ? 3 : s.result === 'draw' ? 1 : 0
        }));
        return { ...p, status: 'completed', scores: processedScores };
      }
      return p;
    }));
    setSelectedParty(null);
    setShowSummary(partyId);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        <video key={currentVideo} autoPlay muted loop className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src={videos[currentVideo]} type="video/webm" />
        </video>
        
        <div className="relative z-10 w-full max-w-md mx-4">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center animate-pulse text-5xl">
                🎮
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Game+ Party Hub
            </h1>
            <p className="text-gray-400 text-center mb-8">Arkadaşlarınla oyna, skorları takip et!</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Adını gir..."
                />
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                  placeholder="Şifre..."
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all flex items-center justify-center gap-2"
              >
                <span className="text-xl">🚀</span>
                Giriş Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <video key={currentVideo} autoPlay muted loop className="fixed inset-0 w-full h-full object-cover opacity-20">
        <source src={videos[currentVideo]} type="video/webm" />
      </video>

      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 mb-6 border border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">🎮</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Game+ Party Hub
                </h1>
                <p className="text-gray-400 text-xs sm:text-sm">Hoşgeldin, {username}! 👋</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewParty(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              <span className="text-xl">➕</span>
              <span>Yeni Party</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('parties')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'parties' ? 'bg-gray-900/90 text-blue-400 border border-gray-700' : 'bg-gray-900/50 text-gray-400 border border-gray-800'
            }`}
          >
            🎮 Partiler
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'completed' ? 'bg-gray-900/90 text-blue-400 border border-gray-700' : 'bg-gray-900/50 text-gray-400 border border-gray-800'
            }`}
          >
            🏆 Tamamlanan
          </button>
        </div>

        {parties.length === 0 && (
          <div className="text-center py-16 bg-gray-900/80 rounded-2xl border border-gray-800">
            <div className="text-8xl mb-4">🎮</div>
            <p className="text-gray-400 text-lg">Henüz party yok. Hemen bir tane oluştur!</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {parties.filter(p => activeTab === 'parties' ? p.status !== 'completed' : p.status === 'completed').map(party => {
            const game = games.find(g => g.name === party.game);
            const isHost = party.host === username;
            return (
              <div key={party.id} className="bg-gray-900/80 rounded-2xl p-6 border border-gray-800">
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{party.title}</h3>
                    <p className="text-sm text-gray-400">Host: {party.host}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    party.status === 'voting' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    {party.status === 'voting' ? '📊 Oylama' : '✅ Aktif'}
                  </span>
                </div>
                
                {party.status === 'voting' && (
                  <div className="flex gap-2">
                    <button onClick={() => setShowVoting(party.id)} className="flex-1 bg-yellow-600 text-white py-2 rounded-xl">📊 Oy Ver</button>
                    {isHost && <button onClick={() => finalize(party.id)} className="flex-1 bg-green-600 text-white py-2 rounded-xl">🔒 Kilitle</button>}
                  </div>
                )}
                
                {party.status === 'upcoming' && (
                  <div className="flex gap-2">
                    <button onClick={() => join(party.id)} className="flex-1 bg-blue-600 text-white py-2 rounded-xl">✨ Katıl</button>
                    {isHost && <button onClick={() => setSelectedParty(party)} className="flex-1 bg-green-600 text-white py-2 rounded-xl">🏁 Bitir</button>}
                  </div>
                )}
                
                {party.status === 'completed' && (
                  <button onClick={() => setShowSummary(party.id)} className="w-full bg-purple-600 text-white py-2 rounded-xl">📊 Özet</button>
                )}
              </div>
            );
          })}
        </div>

        {showNewParty && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-lg w-full border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">🎉 Yeni Party</h2>
              
              <input
                value={newParty.title}
                onChange={(e) => setNewParty({ ...newParty, title: e.target.value })}
                placeholder="Party Başlığı"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white mb-4"
              />
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {games.map(g => (
                  <button
                    key={g.name}
                    onClick={() => toggleGame(g.name)}
                    className={`p-3 rounded-xl border ${newParty.candidateGames.includes(g.name) ? 'border-blue-500 bg-blue-500/20' : 'border-gray-700 bg-gray-800'}`}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <span className="text-sm text-white ml-2">{g.name}</span>
                  </button>
                ))}
              </div>
              
              <input
                type="date"
                value={newParty.date}
                onChange={(e) => setNewParty({ ...newParty, date: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white mb-4"
              />
              
              <button onClick={addSlot} className="w-full bg-gray-800 text-white py-2 rounded-xl mb-4">➕ Slot Ekle</button>
              
              <div className="flex gap-2">
                <button onClick={() => setShowNewParty(false)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl">İptal</button>
                <button onClick={createParty} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl">Oluştur</button>
              </div>
            </div>
          </div>
        )}

        {showVoting && (() => {
          const party = parties.find(p => p.id === showVoting);
          if (!party) return null;
          return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">📊 Oylama</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {party.candidateGames.map(gname => {
                    const g = games.find(x => x.name === gname);
                    return (
                      <button key={gname} onClick={() => voteGame(party.id, gname)} className="p-4 bg-gray-800 rounded-xl">
                        <span className="text-3xl">{g?.icon}</span>
                        <div className="text-white text-sm">{gname}</div>
                        <div className="text-gray-400 text-xs">{party.votes[gname]} oy</div>
                      </button>
                    );
                  })}
                </div>
                {party.slots.map(s => (
                  <div key={s.id} className="p-3 bg-gray-800 rounded-xl mb-2">
                    <div className="text-white mb-2">🕐 {s.time}</div>
                    <div className="flex gap-2">
                      <button onClick={() => voteSlot(party.id, s.id, 'yes')} className="flex-1 bg-green-600 text-white py-2 rounded-lg">✅ Uygun</button>
                      <button onClick={() => voteSlot(party.id, s.id, 'no')} className="flex-1 bg-red-600 text-white py-2 rounded-lg">❌ Değil</button>
                    </div>
                  </div>
                ))}
                <button onClick={() => setShowVoting(null)} className="w-full bg-gray-800 text-white py-3 rounded-xl mt-4">Kapat</button>
              </div>
            </div>
          );
        })()}

        {selectedParty && (() => {
          const [scores, setScores] = useState(selectedParty.participants.map(p => ({ player: p, score: 0, result: 'lose' })));
          return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">🏆 Skorlar</h3>
                {scores.map((s, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{s.player}</span>
                      <input
                        type="number"
                        value={s.score}
                        onChange={(e) => {
                          const ns = [...scores];
                          ns[i].score = parseInt(e.target.value) || 0;
                          setScores(ns);
                        }}
                        className="w-20 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-white"
                      />
                    </div>
                    <select
                      value={s.result}
                      onChange={(e) => {
                        const ns = [...scores];
                        ns[i].result = e.target.value;
                        setScores(ns);
                      }}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
                    >
                      <option value="win">🏆 Kazandı (3p)</option>
                      <option value="draw">🤝 Berabere (1p)</option>
                      <option value="lose">❌ Kaybetti (0p)</option>
                    </select>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button onClick={() => setSelectedParty(null)} className="flex-1 bg-gray-800 text-white py-3 rounded-xl">İptal</button>
                  <button onClick={() => finish(selectedParty.id, scores)} className="flex-1 bg-green-600 text-white py-3 rounded-xl">Kaydet</button>
                </div>
              </div>
            </div>
          );
        })()}

        {showSummary && (() => {
          const party = parties.find(p => p.id === showSummary);
          if (!party || !party.scores) return null;
          const sorted = [...party.scores].sort((a, b) => b.points - a.points);
          const mvp = sorted[0];
          return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
              <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">🎉 Özet</h3>
                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl p-4 text-center mb-4">
                  <div className="text-4xl mb-2">👑</div>
                  <div className="text-white font-bold">MVP: {mvp.player}</div>
                  <div className="text-yellow-200 text-sm">{mvp.points} Puan</div>
                </div>
                <div className="bg-gray-800 rounded-xl p-4 mb-4">
                  {sorted.map((s, i) => (
                    <div key={i} className="flex justify-between text-white mb-2">
                      <span>{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'} {s.player}</span>
                      <span>{s.points}p</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => alert('Paylaşıldı!')} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl mb-2">📤 Paylaş</button>
                <button onClick={() => setShowSummary(null)} className="w-full bg-gray-800 text-white py-2 rounded-xl">Kapat</button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default GamePartyHub;
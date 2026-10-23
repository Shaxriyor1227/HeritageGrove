import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hg_auth_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default active Patron user
    return {
      id: 1,
      name: 'Master Anvar',
      email: 'anvar.collector@heritage.uz',
      phone: '+998 90 123 45 67',
      address: 'Tashkent, Mirabad District, Afrosiyob Street, 14',
      role: 'user', // 'user' | 'admin'
      guildTier: 'Master Collector',
      guildPoints: 480,
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('hg_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hg_auth_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // 1. Direct super-admin shortcut
    if (email === 'admin@heritage.uz' && (password === 'admin123' || password === 'admin')) {
      const adminUser = {
        id: 999,
        name: 'Studio Director',
        email: 'admin@heritage.uz',
        phone: '+998 71 200 88 20',
        role: 'admin',
        guildTier: 'Kyoto Kiln Director',
        guildPoints: 9999,
      };
      setUser(adminUser);
      return { success: true, user: adminUser };
    }

    // 2. Try backend API
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        const loggedUser = {
          ...data.user,
          phone: data.user.phone || '+998 90 123 45 67',
          address: data.user.address || 'Tashkent, Uzbekistan',
          guildTier: data.user.role === 'admin' ? 'Studio Director' : 'Master Collector',
          guildPoints: 480,
        };
        setUser(loggedUser);
        return { success: true, user: loggedUser };
      }
    } catch (e) {
      // Offline fallback
    }

    // 3. Fallback authentication simulation
    const role = (email === 'admin@heritage.uz' || email.includes('admin')) ? 'admin' : 'user';
    const fallbackUser = {
      id: Math.floor(100 + Math.random() * 900),
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+998 90 123 45 67',
      address: 'Tashkent, Uzbekistan',
      role,
      guildTier: role === 'admin' ? 'Studio Director' : 'Master Collector',
      guildPoints: 480,
    };
    setUser(fallbackUser);
    return { success: true, user: fallbackUser };
  };

  const signup = async (name, email, password, role = 'user') => {
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const newUser = {
          id: data.id || Date.now(),
          name,
          email,
          phone: '+998 90 000 00 00',
          address: 'Tashkent, Uzbekistan',
          role: (email === 'admin@heritage.uz' || role === 'admin') ? 'admin' : 'user',
          guildTier: 'Guild Patron',
          guildPoints: 100,
        };
        setUser(newUser);
        return { success: true, user: newUser };
      }
    } catch (e) {}

    // Simulated new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone: '+998 90 000 00 00',
      address: 'Tashkent, Uzbekistan',
      role: (email === 'admin@heritage.uz' || role === 'admin') ? 'admin' : 'user',
      guildTier: 'Guild Patron',
      guildPoints: 100,
    };
    setUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hg_auth_user');
  };

  const switchRole = (newRole) => {
    if (!user) return;
    const updated = {
      ...user,
      role: newRole,
      guildTier: newRole === 'admin' ? 'Studio Director' : 'Master Collector',
    };
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

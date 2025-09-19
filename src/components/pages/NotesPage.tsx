import { useState } from 'react';
import { Plus, Edit3, Trash2, Heart, Star } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: 'dream' | 'goal' | 'reminder' | 'idea';
  color: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Dream Vacation to Japan 🌸',
      content: 'Save $3000 for cherry blossom season trip. Visit Tokyo, Kyoto, and see Mount Fuji. Budget breakdown: Flight $800, Hotel $1000, Food & Activities $1200.',
      category: 'dream',
      color: 'from-pink-400 to-rose-400',
      favorite: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-10',
    },
    {
      id: '2',
      title: 'Monthly Budget Goals 🎯',
      content: 'Food: $500, Beauty: $300, Clothes: $200, Entertainment: $150, Savings: $2000. Try to cook more at home to save on food expenses.',
      category: 'goal',
      color: 'from-purple-400 to-violet-400',
      favorite: false,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-12',
    },
    {
      id: '3',
      title: 'Skincare Routine Investment 💄',
      content: 'Research good skincare products. Current routine needs improvement. Budget $200/month for quality products. Check reviews for The Ordinary and Cetaphil.',
      category: 'idea',
      color: 'from-green-400 to-emerald-400',
      favorite: true,
      createdAt: '2024-01-05',
      updatedAt: '2024-01-05',
    },
  ]);

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'dream' as const,
    color: 'from-pink-400 to-rose-400',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const categoryOptions = [
    { id: 'dream', label: '✨ Dreams & Wishes', color: 'from-pink-400 to-rose-400' },
    { id: 'goal', label: '🎯 Financial Goals', color: 'from-purple-400 to-violet-400' },
    { id: 'reminder', label: '⏰ Reminders', color: 'from-blue-400 to-indigo-400' },
    { id: 'idea', label: '💡 Ideas & Tips', color: 'from-green-400 to-emerald-400' },
  ];

  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        category: newNote.category,
        color: newNote.color,
        favorite: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      
      setNotes([note, ...notes]);
      setNewNote({
        title: '',
        content: '',
        category: 'dream',
        color: 'from-pink-400 to-rose-400',
      });
      setShowAddForm(false);
    }
  };

  const handleToggleFavorite = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, favorite: !note.favorite } : note
    ));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getCategoryInfo = (category: string) => {
    return categoryOptions.find(opt => opt.id === category) || categoryOptions[0];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-cute font-bold text-primary mb-2">
          📝 Dream Notes & Ideas
        </h1>
        <p className="text-lg font-sakura text-muted-foreground">
          Capture your financial dreams and brilliant ideas
        </p>
      </div>

      {/* Add Note Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-sakura inline-flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Note
        </button>
      </div>

      {/* Add Note Form */}
      {showAddForm && (
        <div className="card-sakura">
          <h2 className="text-xl font-cute font-bold text-foreground mb-6">
            ✨ Create New Note
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-sakura font-medium text-foreground mb-2">
                Title
              </label>
              <input
                type="text"
                placeholder="What's on your mind?"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="input-sakura w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-sakura font-medium text-foreground mb-2">
                Category
              </label>
              <select
                value={newNote.category}
                onChange={(e) => {
                  const category = e.target.value as any;
                  const categoryInfo = getCategoryInfo(category);
                  setNewNote({ ...newNote, category, color: categoryInfo.color });
                }}
                className="input-sakura w-full"
              >
                {categoryOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-sakura font-medium text-foreground mb-2">
                Content
              </label>
              <textarea
                placeholder="Write your thoughts, dreams, or ideas here..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={4}
                className="input-sakura w-full resize-none"
              />
            </div>
            
            <div className="flex gap-4">
              <button onClick={handleAddNote} className="btn-sakura">
                Save Note
              </button>
              <button 
                onClick={() => setShowAddForm(false)} 
                className="btn-soft"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => {
          const categoryInfo = getCategoryInfo(note.category);
          
          return (
            <div
              key={note.id}
              className="group relative rounded-3xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--card)) 100%)`,
                borderColor: 'hsl(var(--border))',
              }}
            >
              {/* Category Badge */}
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-cute font-semibold text-white bg-gradient-to-r ${categoryInfo.color} mb-3`}>
                {categoryInfo.label}
              </div>
              
              {/* Favorite Button */}
              <button
                onClick={() => handleToggleFavorite(note.id)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  note.favorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'
                }`}
              >
                <Heart size={16} fill={note.favorite ? 'currentColor' : 'none'} />
              </button>
              
              {/* Note Content */}
              <h3 className="font-cute font-bold text-lg text-foreground mb-3 pr-8">
                {note.title}
              </h3>
              
              <p className="font-sakura text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
                {note.content}
              </p>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground font-sakura">
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-1 rounded text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setEditingId(note.id)}
                  >
                    <Edit3 size={14} />
                  </button>
                  <button 
                    className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Favorites Section */}
      <div className="card-sakura">
        <h2 className="text-xl font-cute font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="text-amber-400" fill="currentColor" />
          Favorite Dreams
        </h2>
        
        {notes.filter(note => note.favorite).length > 0 ? (
          <div className="space-y-3">
            {notes.filter(note => note.favorite).map(note => (
              <div key={`fav-${note.id}`} className="flex items-start gap-3 p-3 rounded-2xl bg-gradient-soft">
                <div className="text-lg">
                  {note.category === 'dream' ? '✨' : 
                   note.category === 'goal' ? '🎯' : 
                   note.category === 'reminder' ? '⏰' : '💡'}
                </div>
                <div>
                  <h4 className="font-cute font-semibold text-foreground">{note.title}</h4>
                  <p className="text-sm text-muted-foreground font-sakura line-clamp-2">
                    {note.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground font-sakura text-center py-8">
            No favorite notes yet. Click the ❤️ icon on notes to add them here!
          </p>
        )}
      </div>
    </div>
  );
};
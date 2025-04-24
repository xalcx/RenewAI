-- Crear la tabla de feedback
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  original_image_url TEXT NOT NULL,
  processed_image_url TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Configurar RLS (Row Level Security)
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Política para permitir a los usuarios ver solo su propio feedback
CREATE POLICY "Users can view their own feedback" 
  ON public.feedback 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para permitir a los usuarios insertar su propio feedback
CREATE POLICY "Users can insert their own feedback" 
  ON public.feedback 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Dar permisos al rol anónimo y autenticado
GRANT SELECT, INSERT ON public.feedback TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.feedback_id_seq TO anon, authenticated;

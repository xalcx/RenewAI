-- Tabla para almacenar los activos de los usuarios
CREATE TABLE IF NOT EXISTS user_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('solar', 'eolico', 'hibrido')),
  site_name TEXT NOT NULL,
  capacity NUMERIC NOT NULL,
  location TEXT NOT NULL,
  installation_year INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad para user_assets
ALTER TABLE user_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own assets"
  ON user_assets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assets"
  ON user_assets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assets"
  ON user_assets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assets"
  ON user_assets FOR DELETE
  USING (auth.uid() = user_id);

-- Tabla para almacenar el feedback del interactivo
CREATE TABLE IF NOT EXISTS interactivo_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 1 AND score <= 5),
  comment TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de seguridad para interactivo_feedback
ALTER TABLE interactivo_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own feedback"
  ON interactivo_feedback FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own feedback"
  ON interactivo_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback"
  ON interactivo_feedback FOR SELECT
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE email = 'admin@renewai.com'
  ));

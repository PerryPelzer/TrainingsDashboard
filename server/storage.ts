import {
  users, spieler, trainingseinheiten,
  type User, type InsertUser,
  type Spieler, type InsertSpieler,
  type Trainingseinheit, type InsertTrainingseinheit
} from "@shared/schema";

export interface IStorage {
  // Benutzer (Trainer) Operationen
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Spieler Operationen
  getPlayer(id: number): Promise<Player | undefined>;
  getAllPlayers(): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  
  // Trainingsart Operationen
  getTrainingType(id: number): Promise<TrainingType | undefined>;
  getAllTrainingTypes(): Promise<TrainingType[]>;
  createTrainingType(type: InsertTrainingType): Promise<TrainingType>;
  
  // Trainingseinheit Operationen
  getTrainingSession(id: number): Promise<TrainingSession | undefined>;
  getAllTrainingSessions(): Promise<TrainingSession[]>;
  createTrainingSession(session: InsertTrainingSession): Promise<TrainingSession>;
  
  // Spielerbewertung Operationen
  getPlayerEvaluation(id: number): Promise<PlayerEvaluation | undefined>;
  getPlayerEvaluationsByPlayer(playerId: number): Promise<PlayerEvaluation[]>;
  getPlayerEvaluationsBySession(sessionId: number): Promise<PlayerEvaluation[]>;
  createPlayerEvaluation(evaluation: InsertPlayerEvaluation): Promise<PlayerEvaluation>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private players: Map<number, Player>;
  private trainingTypes: Map<number, TrainingType>;
  private trainingSessions: Map<number, TrainingSession>;
  private playerEvaluations: Map<number, PlayerEvaluation>;
  
  private userCurrentId: number;
  private playerCurrentId: number;
  private trainingTypeCurrentId: number;
  private trainingSessionCurrentId: number;
  private playerEvaluationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.players = new Map();
    this.trainingTypes = new Map();
    this.trainingSessions = new Map();
    this.playerEvaluations = new Map();
    
    this.userCurrentId = 1;
    this.playerCurrentId = 1;
    this.trainingTypeCurrentId = 1;
    this.trainingSessionCurrentId = 1;
    this.playerEvaluationCurrentId = 1;
    
    // Initialisiere mit Standard-Trainingsarten
    this.initTrainingTypes();
    // Initialisiere mit Demo-Spielern
    this.initPlayers();
  }

  private initTrainingTypes() {
    const defaultTypes = [
      { name: "Techniktraining", description: "Training der technischen Fähigkeiten" },
      { name: "Taktiktraining", description: "Training taktischer Spielzüge und Verständnis" },
      { name: "Konditionstraining", description: "Training zur Verbesserung der Ausdauer und Kraft" },
      { name: "Spieltraining", description: "Spielsituationen und Anwendung von Techniken im Spiel" }
    ];
    
    defaultTypes.forEach(type => {
      this.createTrainingType(type);
    });
  }
  
  private initPlayers() {
    const defaultPlayers = [
      { name: "Max Müller", position: "Mittelfeld", initials: "MM" },
      { name: "Thomas Schmidt", position: "Verteidigung", initials: "TS" },
      { name: "Lukas Weber", position: "Sturm", initials: "LW" },
      { name: "Felix Becker", position: "Verteidigung", initials: "FB" }
    ];
    
    defaultPlayers.forEach(player => {
      this.createPlayer(player);
    });
  }

  // Benutzer Methoden
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Spieler Methoden
  async getPlayer(id: number): Promise<Player | undefined> {
    return this.players.get(id);
  }
  
  async getAllPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }
  
  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.playerCurrentId++;
    const player: Player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }
  
  // Trainingsart Methoden
  async getTrainingType(id: number): Promise<TrainingType | undefined> {
    return this.trainingTypes.get(id);
  }
  
  async getAllTrainingTypes(): Promise<TrainingType[]> {
    return Array.from(this.trainingTypes.values());
  }
  
  async createTrainingType(insertType: InsertTrainingType): Promise<TrainingType> {
    const id = this.trainingTypeCurrentId++;
    const type: TrainingType = { ...insertType, id };
    this.trainingTypes.set(id, type);
    return type;
  }
  
  // Trainingseinheit Methoden
  async getTrainingSession(id: number): Promise<TrainingSession | undefined> {
    return this.trainingSessions.get(id);
  }
  
  async getAllTrainingSessions(): Promise<TrainingSession[]> {
    return Array.from(this.trainingSessions.values());
  }
  
  async createTrainingSession(insertSession: InsertTrainingSession): Promise<TrainingSession> {
    const id = this.trainingSessionCurrentId++;
    const session: TrainingSession = { ...insertSession, id };
    this.trainingSessions.set(id, session);
    return session;
  }
  
  // Spielerbewertung Methoden
  async getPlayerEvaluation(id: number): Promise<PlayerEvaluation | undefined> {
    return this.playerEvaluations.get(id);
  }
  
  async getPlayerEvaluationsByPlayer(playerId: number): Promise<PlayerEvaluation[]> {
    return Array.from(this.playerEvaluations.values()).filter(
      evaluation => evaluation.player_id === playerId
    );
  }
  
  async getPlayerEvaluationsBySession(sessionId: number): Promise<PlayerEvaluation[]> {
    return Array.from(this.playerEvaluations.values()).filter(
      evaluation => evaluation.session_id === sessionId
    );
  }
  
  async createPlayerEvaluation(insertEvaluation: InsertPlayerEvaluation): Promise<PlayerEvaluation> {
    const id = this.playerEvaluationCurrentId++;
    const evaluation: PlayerEvaluation = { ...insertEvaluation, id };
    this.playerEvaluations.set(id, evaluation);
    return evaluation;
  }
}

export const storage = new MemStorage();

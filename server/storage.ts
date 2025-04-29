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
  getPlayer(id: number): Promise<Spieler | undefined>;
  getAllPlayers(): Promise<Spieler[]>;
  createPlayer(player: InsertSpieler): Promise<Spieler>;
  
  // Trainingseinheit Operationen
  getTrainingSession(id: number): Promise<Trainingseinheit | undefined>;
  getAllTrainingSessions(): Promise<Trainingseinheit[]>;
  createTrainingSession(session: InsertTrainingseinheit): Promise<Trainingseinheit>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private players: Map<number, Spieler>;
  private trainingSessions: Map<number, Trainingseinheit>;
  
  private userCurrentId: number;
  private playerCurrentId: number;
  private trainingSessionCurrentId: number;

  constructor() {
    this.users = new Map();
    this.players = new Map();
    this.trainingSessions = new Map();
    
    this.userCurrentId = 1;
    this.playerCurrentId = 1;
    this.trainingSessionCurrentId = 1;
    
    // Initialisiere mit Demo-Spielern
    this.initPlayers();
  }

  // Diese Methode wird nicht mehr verwendet
  
  private initPlayers() {
    const defaultPlayers = [
      { name: "Max Müller", position: "Mittelfeld", initialen: "MM" },
      { name: "Thomas Schmidt", position: "Verteidigung", initialen: "TS" },
      { name: "Lukas Weber", position: "Sturm", initialen: "LW" },
      { name: "Felix Becker", position: "Verteidigung", initialen: "FB" }
    ];
    
    // Spieler manuell hinzufügen, da createPlayer noch Probleme hat
    defaultPlayers.forEach((player, index) => {
      const id = index + 1;
      this.players.set(id, { ...player, id });
      this.playerCurrentId = id + 1;
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
  async getPlayer(id: number): Promise<Spieler | undefined> {
    return this.players.get(id);
  }
  
  async getAllPlayers(): Promise<Spieler[]> {
    return Array.from(this.players.values());
  }
  
  async createPlayer(insertPlayer: InsertSpieler): Promise<Spieler> {
    const id = this.playerCurrentId++;
    const player: Spieler = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }
  
  // Trainingseinheit Methoden
  async getTrainingSession(id: number): Promise<Trainingseinheit | undefined> {
    return this.trainingSessions.get(id);
  }
  
  async getAllTrainingSessions(): Promise<Trainingseinheit[]> {
    return Array.from(this.trainingSessions.values());
  }
  
  async createTrainingSession(insertSession: InsertTrainingseinheit): Promise<Trainingseinheit> {
    const id = this.trainingSessionCurrentId++;
    const session: Trainingseinheit = { ...insertSession, id };
    this.trainingSessions.set(id, session);
    return session;
  }
}

export const storage = new MemStorage();

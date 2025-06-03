"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../auth/entities/user.entity");
const bitcoin_entity_1 = require("../crypto/entities/bitcoin.entity");
const ethereum_entity_1 = require("../crypto/entities/ethereum.entity");
let CryptoService = class CryptoService {
    constructor(bitcoinRepo, ethRepo, userRepo) {
        this.bitcoinRepo = bitcoinRepo;
        this.ethRepo = ethRepo;
        this.userRepo = userRepo;
    }
    async getUserBitcoin(userId) {
        const wallet = await this.bitcoinRepo.findOne({
            where: { user: { id: userId } },
            relations: ['user'] // Добавляем если нужно загрузить связанного пользователя
        });
        if (!wallet) {
            // Создаем новый кошелек, если не найден
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const newWallet = this.bitcoinRepo.create({ user, balance: 0 });
            return this.bitcoinRepo.save(newWallet);
        }
        return wallet;
    }
    async updateBitcoinBalance(userId, amount) {
        let wallet = await this.bitcoinRepo.findOne({
            where: { user: { id: userId } },
            relations: ['user']
        });
        if (!wallet) {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            wallet = this.bitcoinRepo.create({ user, balance: amount });
        }
        else {
            wallet.balance = amount;
        }
        return this.bitcoinRepo.save(wallet);
    }
    async getUserEthereum(userId) {
        const wallet = await this.ethRepo.findOne({
            where: { user: { id: userId } },
            relations: ['user']
        });
        if (!wallet) {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const newWallet = this.ethRepo.create({ user, balance: 0 });
            return this.ethRepo.save(newWallet);
        }
        return wallet;
    }
    async updateEthereumBalance(userId, amount) {
        let wallet = await this.ethRepo.findOne({
            where: { user: { id: userId } },
            relations: ['user']
        });
        if (!wallet) {
            const user = await this.userRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            wallet = this.ethRepo.create({ user, balance: amount });
        }
        else {
            wallet.balance = amount;
        }
        return this.ethRepo.save(wallet);
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bitcoin_entity_1.BitcoinWallet)),
    __param(1, (0, typeorm_1.InjectRepository)(ethereum_entity_1.EthereumWallet)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CryptoService);

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
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operation_entity_1 = require("./entities/operation.entity");
const user_entity_1 = require("../auth/entities/user.entity");
let FinanceService = class FinanceService {
    constructor(operationRepository) {
        this.operationRepository = operationRepository;
    }
    async createOperation(createOperationDto, user) {
        const operation = this.operationRepository.create({
            ...createOperationDto,
            date: new Date(createOperationDto.date),
            user,
        });
        const savedOperation = await this.operationRepository.save(operation);
        // Обновляем баланс
        const amount = createOperationDto.amount;
        if (createOperationDto.type === 'income') {
            user.balance += amount;
        }
        else {
            user.balance -= amount;
        }
        await this.operationRepository.manager.getRepository(user_entity_1.User).save(user);
        return savedOperation;
    }
    async getUserOperations(userId) {
        return this.operationRepository.find({
            where: { user: { id: userId } },
            order: { date: 'DESC' },
        });
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operation_entity_1.Operation)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FinanceService);

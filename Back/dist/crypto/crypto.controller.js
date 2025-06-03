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
exports.CryptoController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const crypto_service_1 = require("./crypto.service");
let CryptoController = class CryptoController {
    constructor(cryptoService) {
        this.cryptoService = cryptoService;
    }
    async getBitcoin(req) {
        return this.cryptoService.getUserBitcoin(req.user.id);
    }
    async updateBitcoin(req, amount) {
        return this.cryptoService.updateBitcoinBalance(req.user.id, amount);
    }
    async getEthereum(req) {
        return this.cryptoService.getUserEthereum(req.user.id);
    }
    async updateEthereum(req, amount) {
        return this.cryptoService.updateEthereumBalance(req.user.id, amount);
    }
};
exports.CryptoController = CryptoController;
__decorate([
    (0, common_1.Get)('bitcoin'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CryptoController.prototype, "getBitcoin", null);
__decorate([
    (0, common_1.Post)('bitcoin'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CryptoController.prototype, "updateBitcoin", null);
__decorate([
    (0, common_1.Get)('ethereum'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CryptoController.prototype, "getEthereum", null);
__decorate([
    (0, common_1.Post)('ethereum'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CryptoController.prototype, "updateEthereum", null);
exports.CryptoController = CryptoController = __decorate([
    (0, common_1.Controller)('crypto'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')) // Используем JWT guard
    ,
    __metadata("design:paramtypes", [crypto_service_1.CryptoService])
], CryptoController);

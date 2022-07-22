import MapMgr from "../../Mgr/MapMgr";
import MonsterMgr from "../../Mgr/MonsterMgr";
import Weapon from "../Weapon";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Projectile extends Weapon {
    equation: any
    addSpeed: any;
    theta: number;

    start() {
        let boxCollider = this.addComponent(cc.BoxCollider)
        boxCollider.size = this.size
        this.addComponent(cc.RigidBody)
    }

    // 获取子弹的目标
    getTarget() {
        let worldPos = this.getWorldPos()
        let targetPos = MonsterMgr.getInstance().getNearestMonsterPos(worldPos)
        if (!targetPos || targetPos.sub(worldPos).len() > cc.winSize.height / 2) {
            targetPos = cc.v2(cc.winSize.width * 3 / 4, worldPos.y)
        }

        let posByThisNode = targetPos.subSelf(worldPos)
        this.equation = this.getParabolicEquation(cc.v2(0, 0), posByThisNode)

        let tempX = 0.01
        if (posByThisNode.x < 0) {
            tempX = -0.01
        }
        let tempY = this.getY(tempX)
        return cc.v2(tempX, tempY).normalizeSelf()
    }

    // 获取抛物线方程
    getParabolicEquation(p1: any, p2: cc.Vec2) {
        let p3 = cc.v2((p1.x + p2.x) / 2, cc.winSize.height / 4)
        let deno = (p1.x - p2.x) * (p1.x - p3.x) * (p2.x - p3.x)
        let a = - ((p2.y - p3.y) * p1.x - (p2.x - p3.x) * p1.y + p2.x * p3.y - p3.x * p2.y) / deno
        let b = (p1.x * p1.x * (p2.y - p3.y) + p2.x * p2.x * p3.y - p3.x * p3.x * p2.y - (p2.x * p2.x - p3.x * p3.x) * p1.y) / deno
        let c = (p2.x * p3.x * (p2.x - p3.x) * p1.y + p1.x * p3.x * (p3.x - p1.x) * p2.y + p1.x * p2.x * (p1.x - p2.x) * p3.y) / deno
        return { a: a, b: b, c: c }
    }

    // 传入x，获取抛物线上的 y
    getY(x: number) {
        return this.equation.a * x * x + this.equation.b * x + this.equation.c
    }

    // 移动逻辑
    move() {
        let target = this.getTarget()
        let rigidbody = this.getComponent(cc.RigidBody)
        rigidbody.linearVelocity = cc.v2(target.mulSelf(this.speed))
        // 或者
        let localPoint = cc.v2();
        rigidbody.getWorldPoint(cc.v2(0, 0), localPoint)
    }

    update(dt: number): void {
        if (this.getWorldPos().y < -cc.winSize.height) {
            // 超出地图外，回收
            this.node.removeFromParent()
        }

        // 物理引擎是基于世界坐标系的，所以实际上的位置和速度应该在加上地图的移动速度
        let moveVec = MapMgr.getInstance().getLayerByName("LayerRoot").getComponent("LayerRoot").getMoveVec()
        let speed = cc.v2(moveVec.speed, moveVec.speed)

        let addSpeed = speed.scaleSelf(cc.v2(moveVec.left, moveVec.up))

        let rigidbody = this.getComponent(cc.RigidBody)
        if (addSpeed.len() == 0) {
            if (this.addSpeed.len() != 0) {
                rigidbody.linearVelocity = rigidbody.linearVelocity.subSelf(this.addSpeed)
                this.addSpeed = addSpeed
                this.theta = 361
            }
        } else {
            let theta = addSpeed.signAngle(cc.v2(1, 0))
            if (theta != this.theta) {
                if (this.addSpeed && this.addSpeed.len() != 0) {
                    rigidbody.linearVelocity = rigidbody.linearVelocity.subSelf(this.addSpeed)
                }
                rigidbody.linearVelocity = rigidbody.linearVelocity.addSelf(addSpeed)
                this.addSpeed = addSpeed
                this.theta = theta
            }
        }
    }
}

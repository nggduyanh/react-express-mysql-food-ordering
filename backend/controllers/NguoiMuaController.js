const Exception = require ("../models/Exception")
const NhanXet = require ("../models/NhanXet")
const nguoiban = require ("../utils/constants/NguoiBanConstant")
const monan = require ("../utils/constants/MonAnConstant")
const nhanxet = require ("../utils/constants/NhanXetConstant")
const KhuyenMaiNguoiMua = require ("../models/KhuyenMai_NguoiMua")
const khuyenMaiNguoiMua = require ("../utils/constants/KhuyenMaiNguoiMua")
const NguoiBanYeuThich = require ("../models/NguoiBanYeuThich")
const nguoiBanYeuThich = require ("../utils/constants/NguoiBanYeuThichConstant")
const anhNhanXet = require ("../utils/constants/AnhNhanXetConstant")
const nguoidung = require ("../utils/constants/NguoiDungConstant")
const AnhNhanXet = require ("../models/AnhNhanXet")
const convertFieldToFolder = require ("../utils/FieldNameToFolderName")
class NguoiMuaController 
{
    async addNhanXet (req,res,next)
    {
        if (!req.body[nhanxet.maMonAn]) return next (new Exception (`${nhanxet.maMonAn} is ${req.body[nhanxet.maMonAn]}`,400))
        if (!req.body[nhanxet.maNguoiMua]) return next (new Exception (`${nhanxet.maMonAn} is ${req.body[nhanxet.maMonAn]}`,400))
        
        let nhanXetIds = {
            [anhNhanXet.maMonAn]: req.body[nhanxet.maMonAn],
            [anhNhanXet.maNguoiMua]: req.body[nhanxet.maNguoiMua]
        }
        
        let chiTietAnhNhanXet = req.files[anhNhanXet.anh]?.map (file => {
            let folder = convertFieldToFolder (anhNhanXet.anh)
            let fileName = file.filename
            let imageRoute = `img/${folder}/${fileName}`
            return {
                ...nhanXetIds,
                [anhNhanXet.anh]: imageRoute
            }
        })

        delete req.body[anhNhanXet.anh]
        let obj = await NhanXet.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        
        if (chiTietAnhNhanXet)
        {
            let insertChiTietAnhNhanXet = await AnhNhanXet.add (chiTietAnhNhanXet)
            if (!insertChiTietAnhNhanXet.success) return next (new Exception (insertChiTietAnhNhanXet.res,500))
            
            chiTietAnhNhanXet = await AnhNhanXet.getByComment (nhanXetIds)
            obj.res[0][anhNhanXet.tableName] = chiTietAnhNhanXet.res
        }

        return res.status(201).json (obj.res)
    }

    async updateNhanXet (req,res,next)
    {
        if (!req.body[nhanxet.maMonAn]) return next (new Exception (`${nhanxet.maMonAn} is ${req.body[nhanxet.maMonAn]}`,400))
        if (!req.body[nhanxet.maNguoiMua]) return next (new Exception (`${nhanxet.maMonAn} is ${req.body[nhanxet.maMonAn]}`,400))
        let nhanXetIds = {
            [anhNhanXet.maMonAn]: req.body[nhanxet.maMonAn],
            [anhNhanXet.maNguoiMua]: req.body[nhanxet.maNguoiMua]
        }
        
        let chiTietAnhNhanXet = req.files[anhNhanXet.anh]?.map (file => {
            let folder = convertFieldToFolder (anhNhanXet.anh)
            let fileName = file.filename
            let imageRoute = `img/${folder}/${fileName}`
            return {
                ...nhanXetIds,
                [anhNhanXet.anh]: imageRoute
            }
        })
        
        delete req.body[anhNhanXet.anh]
        let obj = await NhanXet.update (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found resource`}, 404))
        
        await AnhNhanXet.removeByComment (nhanXetIds)
        
        if (chiTietAnhNhanXet)
        {
            let updateChiTietAnhNhanXet = await AnhNhanXet.add (chiTietAnhNhanXet)
            if (!updateChiTietAnhNhanXet.success) return next (new Exception (updateChiTietAnhNhanXet.res,500))
            updateChiTietAnhNhanXet = await AnhNhanXet.getByComment (nhanXetIds)
            obj.res[0][anhNhanXet.tableName] = updateChiTietAnhNhanXet.res
        }
        return res.status (201).json (obj.res)
    }

    async getNguoiMuaByNhanXet (req,res,next)
    {
        let obj = await NhanXet.getByMonAn (req.params.idMonAn)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.length) return next (new Exception ({msg: `Not found NguoiMua with NhanXet has ${req.params.idMonAn} `}, 404))
        let newObj = {}
        obj.res.forEach (elem => {
            let {AnhDinhKem} = elem[anhNhanXet.tableName]
            let comment = elem[nhanxet.tableName]
            let {TenNguoiDung,AnhNguoiDung} = elem[nguoidung.tableName]

            if (!newObj[comment[nhanxet.maMonAn]])
            {
                newObj[comment[nhanxet.maMonAn]] = {}   
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName] = {} 
            }

            if (!newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]])
            {
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]] = {
                    ...comment,
                    TenNguoiDung,
                    AnhNguoiDung
                }
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]][anhNhanXet.tableName] = []
            }

            if (AnhDinhKem) newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]][anhNhanXet.tableName].push (AnhDinhKem)

        })

        return res.status (200).json (Object.values (newObj).map (elem => {
            let comment = Object.values (elem[nhanxet.tableName])
            return {
                ...elem,
                NhanXet: comment
            }
        }))
    }

    async addKhuyenMai (req,res,next)
    {
        let obj = await KhuyenMaiNguoiMua.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async deleteKhuyenMai (req,res,next)
    {
        let obj = await KhuyenMaiNguoiMua.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: `Not found resource `}, 404))
        return res.sendStatus (204) 
    }

    async addNguoiBanYeuThich (req,res,next)
    {
        let obj = await NguoiBanYeuThich.add (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        return res.status(201).json (obj.res)
    }

    async deleteNguoiBanYeuThich (req,res,next)
    {
        let obj = await NguoiBanYeuThich.remove (req.body)
        if (!obj.success) return next (new Exception (obj.res,400))
        if (!obj.res.affectedRows) return next (new Exception ({msg: `Not found resource `}, 404))
        return res.sendStatus (204) 
    }

    async getNhanXetByNguoiMua (req,res,next)
    {
        let obj = await NhanXet.getByNguoiMua (req.params.idNguoiMua)
        if (!obj.success) return next (new Exception (obj.res,400)) 
        if (!obj.res.length) return next (new Exception ({msg: `Not found NhanXet of NguoiMua has ${req.params.idNguoiMua} `}, 404))
        
        let newObj = {}
        obj.res.forEach (elem => {
            let {AnhDinhKem} = elem[anhNhanXet.tableName]
            let comment = elem[nhanxet.tableName]
            let food = elem[monan.tableName]
            if (!newObj[comment[nhanxet.maMonAn]])
            {
                newObj[comment[nhanxet.maMonAn]] = {
                    ...food
                }   

                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName] = {} 
            }

            if (!newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]])
            {
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]] = {
                    ...comment,
                }
                newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]][anhNhanXet.tableName] = []
            }

            if (AnhDinhKem) newObj[comment[nhanxet.maMonAn]][nhanxet.tableName][comment[nhanxet.maNguoiMua]][anhNhanXet.tableName].push (AnhDinhKem)

        })

        return res.status (200).json (Object.values (newObj).map (elem => {
            let comment = Object.values (elem[nhanxet.tableName])
            return {
                ...elem,
                NhanXet: comment
            }
        }))
    }

}

module.exports = new NguoiMuaController
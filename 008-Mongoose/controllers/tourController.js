const Tour = require('./../models/tourModel')

exports.getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'succes',
    requestedAt: req.requestTime,
  })
}

exports.getTour = (req, res) => {
  console.log(req.params)
  const id = req.params.id * 1
}

exports.createTour = async (req, res) => {
  // const newTours = new Tour({})
  //   newTour.save()
  try {
    const newTour = await Tour.create(req.body)

    res.status(201).json({
      status: 'succes',
      data: {
        tour: newTour,
      },
    })

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: "Invalid data sent!",
    })
  }
}

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'succes',
    data: {
      tour: '<Updated your here>',
    },
  })
}
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'succes',
    data: null,
  })
}
